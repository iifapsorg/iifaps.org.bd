// services/category.service

import connectDB from "@/lib/connectDB";
import Category from "@/models/Category";
import { unstable_cache } from "next/cache";
import { slugify, uniqueSlug } from "@/lib/slugify";

/* ---------------------------
   CYCLIC CHECK OF CATEGORY
----------------------------*/
async function detectCycle(parentId, childId) {
  if (!parentId) return false;

  let current = await Category.findById(parentId);

  while (current) {
    if (current._id.toString() === childId?.toString()) {
      return true;
    }

    if (!current.parent) {
      break;
    }

    current = await Category.findById(current.parent);
  }

  return false;
}

/* ---------------------------
   GET ALL CATEGORIES
----------------------------*/
export async function getAllCategories() {
  await connectDB();

  return Category.find({
    isActive: true,
    isDeleted: false,
  })
    .sort({ name: 1 })
    .lean();
}

/* ---------------------------
   CATEGORY TREE - DB
----------------------------*/
async function getCategoryTreeFromDB() {
  await connectDB();

  return Category.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
        parent: null,
      },
    },

    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parent",
        as: "children",

        restrictSearchWithMatch: {
          isActive: true,
          isDeleted: false,
        },
      },
    },

    {
      $set: {
        children: {
          $sortArray: {
            input: "$children",
            sortBy: {
              name: 1,
            },
          },
        },
      },
    },

    {
      $sort: {
        name: 1,
      },
    },
  ]);
}

/* ---------------------------
   CATEGORY TREE - CACHE
----------------------------*/
export const getCategoryTree = unstable_cache(
  getCategoryTreeFromDB,
  ["category-tree"],
  {
    revalidate: 3600,
    tags: ["categories"],
  },
);

/* ---------------------------
   GET CATEGORY BY SLUG
----------------------------*/
export async function getCategoryBySlug(slug) {
  await connectDB();

  return Category.findOne({
    slug,
    isActive: true,
    isDeleted: false,
  }).lean();
}

/* ---------------------------
   GET CATEGORY BY ID
----------------------------*/
export async function getCategoryById(id) {
  await connectDB();

  return Category.findOne({
    _id: id,
    isDeleted: false,
  }).lean();
}

/* ---------------------------
   CREATE CATEGORY
----------------------------*/
export async function createCategory(data, user) {
  await connectDB();

  const baseSlug = slugify(data.name);

  const exists = await Category.findOne({
    slug: baseSlug,
  });

  const slug = exists ? uniqueSlug(data.name) : baseSlug;

  return Category.create({
    ...data,
    slug,
    createdBy: user?.id,
  });
}

/* ---------------------------
   UPDATE CATEGORY
----------------------------*/
export async function updateCategory(id, data, user) {
  await connectDB();

  // Cycle protection
  if (data.parent) {
    const hasCycle = await detectCycle(data.parent, id);

    if (hasCycle) {
      throw new Error("Circular category reference detected");
    }
  }

  // Slug update
  if (data.name) {
    const baseSlug = slugify(data.name);

    const exists = await Category.findOne({
      slug: baseSlug,
      _id: { $ne: id },
    });

    data.slug = exists ? uniqueSlug(data.name) : baseSlug;
  }

  return Category.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        ...data,
        updatedBy: user?.id,
        updatedAt: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
}

/* ---------------------------
   DELETE CATEGORY - SOFT
----------------------------*/
export async function deleteCategory(id, user) {
  await connectDB();

  return Category.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        isActive: false,
        updatedBy: user?.id,
        updatedAt: new Date(),
      },
    },
    {
      new: true,
    },
  );
}

/* ---------------------------
   GET SUBCATEGORIES
----------------------------*/
export async function getSubcategories(parentId) {
  await connectDB();

  return Category.find({
    parent: parentId,
    isActive: true,
    isDeleted: false,
  })
    .sort({ name: 1 })
    .lean();
}

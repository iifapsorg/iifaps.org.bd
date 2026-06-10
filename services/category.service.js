// services/category.service

import connectDB from "@/lib/connectDB";
import Category from "@/models/Category";
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
    if (!current.parent) break;
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
   TREE OF CATEGORY
----------------------------*/
export async function getCategoryTree() {
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
            sortBy: { name: 1 },
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
   GET CATEGORY BY SLUG
----------------------------*/
export async function getCategoryBySlug(slug) {
  await connectDB();
  return Category.findOne({ slug, isActive: true }).lean();
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
  const exists = await Category.findOne({ slug: baseSlug });

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

  // cycle protection
  if (data.parent) {
    const hasCycle = await detectCycle(data.parent, id);
    if (hasCycle) {
      throw new Error("Circular category reference detected");
    }
  }

  // slug update
  if (data.name) {
    const baseSlug = slugify(data.name);
    const exists = await Category.findOne({
      slug: baseSlug,
      _id: { $ne: id },
    });

    data.slug = exists ? uniqueSlug(data.name) : baseSlug;
  }

  return Category.findByIdAndUpdate(
    id,
    {
      ...data,
      updatedBy: user?.id,
    },
    { new: true, runValidators: true }
  );
}

/* ---------------------------
   DELETE CATEGORY (SOFT)
----------------------------*/
export async function deleteCategory(id, user) {
  await connectDB();

  return Category.findByIdAndUpdate(id, {
    isDeleted: true,
    isActive: false,
    updatedBy: user?.id,
  });
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
  }).lean();
}


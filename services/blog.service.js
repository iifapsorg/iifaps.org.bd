// services/blog.service

import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { cacheTag } from "next/cache";

/* ---------------------------
   GET BLOGS
----------------------------*/
export async function getBlogs({
  page = 1,
  limit = 9,
  status = "published",
  category,
  excludeId,
  featured,
  sortBy = "createdAt",
  order = -1,
  select = "thumbnail title category summary content slug views status createdAt author",
  populate = true,
} = {}) {
  "use cache";

  cacheTag("blogs");

  await connectDB();

  const query = {
    isDeleted: false,
    status,
  };

  // Filter by Category Slug
  if (category) {
    const categoryDoc = await Category.findOne({
      slug: category,
      isActive: true,
      isDeleted: false,
    }).select("_id");

    if (!categoryDoc) {
      return {
        blogs: [],
        total: 0,
        pages: 0,
        page,
      };
    }

    query.category = categoryDoc._id;
  }

  // Exclude Blog
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  // Featured Blogs
  if (featured !== undefined) {
    query.featured = featured;
  }

  const skip = (page - 1) * limit;

  let blogsQuery = Blog.find(query)
    .select(select)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  if (populate) {
    blogsQuery = blogsQuery
      .populate("author", "name avatar")
      .populate("category", "name slug");
  }

  const [blogs, total] = await Promise.all([
    blogsQuery.lean(),
    Blog.countDocuments(query),
  ]);

  return {
    blogs: blogs.length ? JSON.parse(JSON.stringify(blogs)) : [],
    total,
    pages: Math.ceil(total / limit),
    page,
  };
}

/* ---------------------------
   GET BLOG BY SLUG
----------------------------*/
export async function getBlogBySlug(slug, { admin = false } = {}) {
  await connectDB();

  const query = {
    slug,
    isDeleted: false,
  };

  // Only admin can see draft blogs
  if (!admin) {
    query.status = "published";
  }

  const blog = await Blog.findOne(query)
    .select(
      "title slug content summary thumbnail createdAt category author views tags status",
    )
    .populate("category")
    .populate("author")
    .lean();

  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

/* ---------------------------
   GET BLOG BY ID
----------------------------*/
export async function getBlogById(id) {
  await connectDB();

  const blog = await Blog.findById(id)
    .select(
      "title slug content summary thumbnail status createdAt category author tags",
    )
    .populate("author", "name")
    .populate("category", "name slug")
    .lean();

  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

/* ---------------------------
   CREATE BLOG
----------------------------*/
export async function createBlog(data) {
  await connectDB();

  const baseSlug = slugify(data.title);
  const existing = await Blog.findOne({ slug: baseSlug });
  const slug = existing ? uniqueSlug(data.title) : baseSlug;

  const blog = await Blog.create({ ...data, slug });

  return JSON.parse(JSON.stringify(blog));
}

/* ---------------------------
   UPDATE BLOG
----------------------------*/
export async function updateBlog(id, data) {
  await connectDB();

  if (data.title) {
    const baseSlug = slugify(data.title);
    const existing = await Blog.findOne({
      slug: baseSlug,
      _id: { $ne: id },
    });

    data.slug = existing ? uniqueSlug(data.title) : baseSlug;
  }

  const blog = await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

/* ---------------------------
   DELETE BLOG (SOFT)
----------------------------*/
export async function deleteBlog(id) {
  await connectDB();

  const blog = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

/* ---------------------------
   SEARCH BLOG
----------------------------*/
export async function searchBlogs(q, { page = 1, limit = 10 } = {}) {
  await connectDB();

  const search = q?.trim();
  const skip = (page - 1) * limit;
  const selectFields = "title slug summary createdAt category author";

  // No search term: return latest published blogs
  if (!search) {
    const query = {
      status: "published",
      isDeleted: false,
    };

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select(selectFields)
        .populate("author", "name")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Blog.countDocuments(query),
    ]);

    return {
      blogs: blogs.length ? JSON.parse(JSON.stringify(blogs)) : [],
      total,
      pages: Math.ceil(total / limit),
      page,
    };
  }

  const query = {
    status: "published",
    isDeleted: false,
    $text: { $search: search },
  };

  const [blogs, total] = await Promise.all([
    Blog.find(query, { score: { $meta: "textScore" } })
      .select(selectFields)
      .populate("author", "name")
      .populate("category", "name slug")
      .sort({ score: { $meta: "textScore" }, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Blog.countDocuments(query),
  ]);

  return {
    blogs: blogs.length ? JSON.parse(JSON.stringify(blogs)) : [],
    total,
    pages: Math.ceil(total / limit),
    page,
  };
}

/* ---------------------------
   RELATED BLOGS
----------------------------*/
export async function getRelatedBlogs(blogId, categoryId, limit = 4) {
  await connectDB();

  const blogs = await Blog.find({
    category: categoryId,
    status: "published",
    isDeleted: false,
    _id: { $ne: blogId },
  })
    .select("title slug thumbnail createdAt category author")
    .populate("author", "name")
    .populate("category", "name slug")
    .limit(limit)
    .lean();

  return blogs.length ? JSON.parse(JSON.stringify(blogs)) : [];
}

/* ---------------------------
   INCREMENT VIEWS
----------------------------*/
export async function incrementBlogViews(id) {
  await connectDB();

  const blog = await Blog.findOneAndUpdate(
    {
      _id: id,
      status: "published",
      isDeleted: false,
    },
    {
      $inc: {
        views: 1,
      },
    },
    {
      new: true,
    },
  )
    .select("_id views")
    .lean();

  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}
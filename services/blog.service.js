import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";
import { slugify, uniqueSlug } from "@/lib/slugify";

/* ---------------- GET ALL BLOGS ---------------- */
export async function getAllBlogs({
  page = 1,
  limit = 10,
  status = "published",
  category,
} = {}) {
  await connectDB();

  const query = { status };
  if (category) query.category = category;

  const skip = (page - 1) * limit;

  const selectFields = "title slug status createdAt category author";

  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .select(selectFields)
      .populate("author", "name avatar")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Blog.countDocuments(query),
  ]);

  return { blogs, total, pages: Math.ceil(total / limit), page };
}

/* ---------------- GET BLOG BY SLUG ---------------- */
export async function getBlogBySlug(slug) {
  await connectDB();

  return Blog.findOne({
    slug,
    isDeleted: false,
    status: "published",
  })
    .select("title slug content excerpt thumbnail createdAt category author views tags")
    .populate("category")
    .populate("author")
    .lean();
}

/* ---------------- GET BLOG BY ID ---------------- */
export async function getBlogById(id) {
  await connectDB();

  return Blog.findById(id)
    .select("title slug content excerpt thumbnail status createdAt category author tags")
    .populate("author", "name")
    .populate("category", "name slug")
    .lean();
}

/* ---------------- CREATE BLOG ---------------- */
export async function createBlog(data) {
  await connectDB();

  const baseSlug = slugify(data.title);
  const existing = await Blog.findOne({ slug: baseSlug });
  const slug = existing ? uniqueSlug(data.title) : baseSlug;

  const blog = await Blog.create({ ...data, slug });
  return blog;
}

/* ---------------- UPDATE BLOG ---------------- */
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

  return Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

/* ---------------- DELETE BLOG ---------------- */
export async function deleteBlog(id) {
  await connectDB();
  return Blog.findByIdAndDelete(id);
}

/* ---------------- SEARCH BLOGS ---------------- */
export async function searchBlogs(q, { page = 1, limit = 10 } = {}) {
  await connectDB();

  const regex = new RegExp(q, "i");

  const query = {
    status: "published",
    $or: [{ title: regex }, { excerpt: regex }, { tags: regex }],
  };

  const skip = (page - 1) * limit;

  const selectFields = "title slug excerpt createdAt category author";

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

  return { blogs, total, pages: Math.ceil(total / limit), page };
}

/* ---------------- RELATED BLOGS ---------------- */
export async function getRelatedBlogs(blogId, categoryId, limit = 4) {
  await connectDB();

  return Blog.find({
    category: categoryId,
    status: "published",
    _id: { $ne: blogId },
  })
    .select("title slug thumbnail createdAt category author")
    .populate("author", "name")
    .populate("category", "name slug")
    .limit(limit)
    .lean();
}
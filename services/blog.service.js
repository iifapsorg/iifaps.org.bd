import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";
import { slugify, uniqueSlug } from "@/lib/slugify";

export async function getAllBlogs({ page = 1, limit = 10, status = "published", category } = {}) {
  await connectDB();
  const query = { status };
  if (category) query.category = category;

  const skip = (page - 1) * limit;
  const [blogs, total] = await Promise.all([
    Blog.find(query)
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

export async function getBlogBySlug(slug) {
  await connectDB();
  const blog = await Blog.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate("author", "name avatar")
    .populate("category", "name slug parent")
    .lean();
  return blog;
}

export async function getBlogById(id) {
  await connectDB();
  return Blog.findById(id).populate("author", "name").populate("category", "name slug").lean();
}

export async function createBlog(data) {
  await connectDB();
  const baseSlug = slugify(data.title);
  const existing = await Blog.findOne({ slug: baseSlug });
  const slug = existing ? uniqueSlug(data.title) : baseSlug;
  const blog = await Blog.create({ ...data, slug });
  return blog;
}

export async function updateBlog(id, data) {
  await connectDB();
  if (data.title) {
    const baseSlug = slugify(data.title);
    const existing = await Blog.findOne({ slug: baseSlug, _id: { $ne: id } });
    data.slug = existing ? uniqueSlug(data.title) : baseSlug;
  }
  return Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteBlog(id) {
  await connectDB();
  return Blog.findByIdAndDelete(id);
}

export async function searchBlogs(q, { page = 1, limit = 10 } = {}) {
  await connectDB();
  const regex = new RegExp(q, "i");
  const query = {
    status: "published",
    $or: [{ title: regex }, { excerpt: regex }, { tags: regex }],
  };
  const skip = (page - 1) * limit;
  const [blogs, total] = await Promise.all([
    Blog.find(query)
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

export async function getRelatedBlogs(blogId, categoryId, limit = 4) {
  await connectDB();
  return Blog.find({ category: categoryId, status: "published", _id: { $ne: blogId } })
    .populate("author", "name")
    .populate("category", "name slug")
    .limit(limit)
    .lean();
}

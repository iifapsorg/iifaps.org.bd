// models/Blog

import mongoose from "mongoose";
import "@/models/Category";
import "@/models/User";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    excerpt: {
      type: String,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },

    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    tags: [{ type: String, trim: true }],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    metaTitle: String,
    metaDescription: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ featured: 1, status: 1, createdAt: -1 });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;

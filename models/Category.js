// lib/categories

// import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Category name is required"],
//       trim: true,
//       maxlength: [100, "Name cannot exceed 100 characters"],
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     parent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       default: null,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// categorySchema.index({ parent: 1 });
// categorySchema.index({ parent: 1, isActive: 1 });

// const Category =
//   mongoose.models.Category || mongoose.model("Category", categorySchema);
// export default Category;

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

// prevent duplicate category under same parent
categorySchema.index({ name: 1, parent: 1 }, { unique: true });

// optimize tree queries
categorySchema.index({ parent: 1, isActive: 1, isDeleted: 1 });

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);

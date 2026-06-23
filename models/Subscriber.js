// models/Subscriber.js

import mongoose from "mongoose";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, "Please provide a valid email"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    verifyToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);


const Subscriber =
  mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;

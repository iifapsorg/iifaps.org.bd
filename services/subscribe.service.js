// services/subscribe.service

import Subscriber from "@/models/Subscriber";
import crypto from "crypto";

/* ---------------------------
   CREATE + GENERATE TOKEN
----------------------------*/
export async function createSubscriber(email) {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    const subscriber = await Subscriber.create({
      email,
      verifyToken: token,
      isVerified: false,
    });

    return subscriber;
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Email already subscribed");
    }
    throw err;
  }
}

/* ---------------------------
   VERIFY EMAIL
----------------------------*/
export async function verifySubscriber(token) {
  const user = await Subscriber.findOne({ verifyToken: token });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.isVerified = true;
  user.verifyToken = null;

  await user.save();

  return user;
}

/* ---------------------------
   GET ONLY VERIFIED USERS
----------------------------*/
export async function getSubscribers() {
  return await Subscriber.find({ isVerified: true }).sort({
    createdAt: -1,
  });
}

/* ---------------------------
   COUNT VERIFIED
----------------------------*/
export async function getSubscriberCount() {
  return await Subscriber.countDocuments({ isVerified: true });
}
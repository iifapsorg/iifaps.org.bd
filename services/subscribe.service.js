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

    return JSON.parse(JSON.stringify(subscriber));
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
  const subscriber = await Subscriber.findOne({
    verifyToken: token,
  });

  if (!subscriber) {
    throw new Error("Invalid or expired token");
  }

  subscriber.isVerified = true;
  subscriber.verifyToken = null;

  await subscriber.save();

  return JSON.parse(JSON.stringify(subscriber));
}

/* ---------------------------
   GET ONLY VERIFIED USERS
----------------------------*/
export async function getSubscribers() {
  const subscribers = await Subscriber.find({
    isVerified: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  return subscribers.length
    ? JSON.parse(JSON.stringify(subscribers))
    : [];
}

/* ---------------------------
   COUNT VERIFIED
----------------------------*/
export async function getSubscriberCount() {
  return Subscriber.countDocuments({
    isVerified: true,
  });
}
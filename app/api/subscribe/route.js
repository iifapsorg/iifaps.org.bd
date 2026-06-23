// app/api/subscribe/route.js

import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";
import { validateSubscribe } from "@/validations/subscribe.validation";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

import {
  createSubscriber,
  getSubscribers,
  getSubscriberCount,
} from "@/services/subscribe.service";

/* --------------------------------
 * CREATE SUBSCRIBER
 * POST /api/subscribe
--------------------------------- */
export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    // Validation
    const error = validateSubscribe({ email });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error,
        },
        { status: 400 },
      );
    }

    const subscriber = await createSubscriber(email);

    await sendVerificationEmail(subscriber.email, subscriber.verifyToken);

    return NextResponse.json(
      {
        success: true,
        message: "Verification email sent. Please check your inbox.",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 },
    );
  }
}

/* --------------------------------
 * GET ALL SUBSCRIBERS
 * GET /api/subscribe
--------------------------------- */
export async function GET() {
  try {
    await connectDB();

    const subscribers = await getSubscribers();
    const totalSubscribers = await getSubscriberCount();

    return NextResponse.json({
      success: true,
      totalSubscribers,
      data: subscribers,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

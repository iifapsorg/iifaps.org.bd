// api/verifyEmail/route

import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { verifySubscriber } from "@/services/subscribe.service";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token missing" },
        { status: 400 }
      );
    }

    await verifySubscriber(token);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false,
        message: error.message },
      { status: 400 }
    );
  }
}
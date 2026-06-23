// api/verify/route

import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { verifySubscriber } from "@/services/subscribe.service";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/failed?reason=missing-token`
      );
    }

    await verifySubscriber(token);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/verified`
    );
  } catch (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/failed`
    );
  }
}
import connectDB from "@/lib/connectDB";

export async function GET() {
  try {
    await connectDB();

    return Response.json(
      {
        success: true,
        message: "MongoDB connected successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "MongoDB connection failed!",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
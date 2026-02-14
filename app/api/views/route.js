import { NextResponse } from "next/server";
import { incrementViews } from "@/lib/db";

// POST /api/views  { slug: "xxx" }
export async function POST(request) {
  try {
    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }
    await incrementViews(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API /views error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getManhwaBySlug, getChaptersByManhwaSlug, incrementViews } from "@/lib/db";

// GET /api/manhwa?slug=the-max-level-players-100th-regression
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const manhwa = await getManhwaBySlug(slug);
    if (!manhwa) {
      return NextResponse.json({ error: "Manhwa not found" }, { status: 404 });
    }

    // Increment views on each fetch
    await incrementViews(slug);

    const chapters = await getChaptersByManhwaSlug(slug);

    return NextResponse.json({
      manhwa: { ...manhwa, _id: manhwa._id.toString() },
      chapters: chapters.map((ch) => ({
        ...ch,
        _id: ch._id.toString(),
      })),
    });
  } catch (error) {
    console.error("API /manhwa error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

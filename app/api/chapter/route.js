import { NextResponse } from "next/server";
import { getChapter, getAdjacentChapters, getManhwaBySlug } from "@/lib/db";

// GET /api/chapter?manhwaSlug=xxx&chapter=1
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const manhwaSlug = searchParams.get("manhwaSlug");
    const chapterNumber = searchParams.get("chapter");

    if (!manhwaSlug || !chapterNumber) {
      return NextResponse.json(
        { error: "manhwaSlug and chapter are required" },
        { status: 400 }
      );
    }

    const [chapter, adjacent, manhwa] = await Promise.all([
      getChapter(manhwaSlug, chapterNumber),
      getAdjacentChapters(manhwaSlug, chapterNumber),
      getManhwaBySlug(manhwaSlug),
    ]);

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json({
      chapter: { ...chapter, _id: chapter._id.toString() },
      manhwa: manhwa ? { title: manhwa.title, slug: manhwa.slug, coverImage: manhwa.coverImage } : null,
      hasPrev: !!adjacent.prev,
      hasNext: !!adjacent.next,
      prevChapter: adjacent.prev?.chapterNumber ?? null,
      nextChapter: adjacent.next?.chapterNumber ?? null,
    });
  } catch (error) {
    console.error("API /chapter error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

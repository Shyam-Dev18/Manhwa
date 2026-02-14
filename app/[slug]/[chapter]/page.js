import { notFound } from "next/navigation";
import Link from "next/link";
import { getChapter, getAdjacentChapters, getManhwaBySlug, getLatestChapterNumber } from "@/lib/db";
import ReaderImages from "@/components/ReaderImages";
import ChapterNavigation from "@/components/ChapterNavigation";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug, chapter } = await params;
  const chapterMatch = chapter.match(/chapter-(\d+)/);
  if (!chapterMatch) return { title: "Chapter Not Found" };

  const chapterNumber = parseInt(chapterMatch[1], 10);
  const manhwa = await getManhwaBySlug(slug);

  return {
    title: manhwa
      ? `${manhwa.title} Chapter ${chapterNumber} - Read Online`
      : `Chapter ${chapterNumber}`,
    description: manhwa
      ? `Reading ${manhwa.title} Chapter ${chapterNumber} in english in high quality at 100regression.com`
      : `Read Chapter ${chapterNumber} online`,
    openGraph: {
      title: manhwa
        ? `${manhwa.title} Chapter ${chapterNumber}`
        : `Chapter ${chapterNumber}`,
      description: `Read Chapter ${chapterNumber} in high quality`,
      type: "article",
    },
  };
}

export default async function ReaderPage({ params }) {
  const { slug, chapter } = await params;

  // Parse chapter number from URL like "chapter-81"
  const chapterMatch = chapter.match(/chapter-(\d+)/);
  if (!chapterMatch) {
    notFound();
  }

  const chapterNumber = parseInt(chapterMatch[1], 10);

  let chapterData = null;
  let manhwa = null;
  let adjacent = { prev: null, next: null };
  let totalChapters = 0;

  try {
    [chapterData, manhwa, adjacent, totalChapters] = await Promise.all([
      getChapter(slug, chapterNumber),
      getManhwaBySlug(slug),
      getAdjacentChapters(slug, chapterNumber),
      getLatestChapterNumber(slug),
    ]);
  } catch (error) {
    console.error("Failed to load chapter:", error);
  }

  if (!chapterData || !manhwa) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Chapter Header */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 text-center">
          <h1 className="text-lg md:text-xl font-bold text-accent mb-1">
            {manhwa.title}
          </h1>
          <h2 className="text-base text-text-primary font-semibold mb-1">
            Chapter {chapterNumber}
          </h2>
          <p className="text-xs text-text-muted">
            Reading {manhwa.title} Chapter {chapterNumber} in english in high quality at 100regression.com
          </p>

          {/* Top navigation */}
          <div className="flex items-center justify-center gap-4 mt-3">
            {adjacent.prev ? (
              <Link
                href={`/${slug}/chapter-${adjacent.prev.chapterNumber}`}
                className="px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded transition-colors"
              >
                ← Previous
              </Link>
            ) : (
              <span className="px-3 py-1.5 bg-bg-card text-text-muted text-xs rounded cursor-not-allowed">
                ← Previous
              </span>
            )}

            <span className="text-text-secondary text-sm">Chapter {chapterNumber}</span>

            {adjacent.next ? (
              <Link
                href={`/${slug}/chapter-${adjacent.next.chapterNumber}`}
                className="px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded transition-colors"
              >
                Next →
              </Link>
            ) : (
              <span className="px-3 py-1.5 bg-bg-card text-text-muted text-xs rounded cursor-not-allowed">
                Next →
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reader Images */}
      <ReaderImages
        images={chapterData.images || []}
        chapterNumber={chapterNumber}
        manhwaTitle={manhwa.title}
      />

      {/* Bottom Chapter Navigation */}
      <ChapterNavigation
        manhwaSlug={slug}
        currentChapter={chapterNumber}
        hasPrev={!!adjacent.prev}
        hasNext={!!adjacent.next}
        prevChapter={adjacent.prev?.chapterNumber ?? null}
        nextChapter={adjacent.next?.chapterNumber ?? null}
        totalChapters={totalChapters}
      />
    </div>
  );
}

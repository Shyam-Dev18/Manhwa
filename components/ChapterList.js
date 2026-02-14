import Link from "next/link";

export default function ChapterList({ chapters, manhwaSlug }) {
  if (!chapters || chapters.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        No chapters available yet.
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {chapters.map((chapter) => (
        <Link
          key={chapter.chapterNumber}
          href={`/${manhwaSlug}/chapter-${chapter.chapterNumber}`}
          className="chapter-item flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0"
        >
          <div>
            <span className="text-text-primary text-sm font-medium">
              Chapter {chapter.chapterNumber}
            </span>
            {chapter.title && (
              <span className="text-text-muted text-sm ml-2">
                — {chapter.title}
              </span>
            )}
          </div>
          <span className="text-text-muted text-xs whitespace-nowrap ml-4">
            {chapter.createdAt
              ? new Date(chapter.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
        </Link>
      ))}
    </div>
  );
}

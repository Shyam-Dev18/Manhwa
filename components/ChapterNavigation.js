"use client";

import Link from "next/link";
import { useState } from "react";

export default function ChapterNavigation({
  manhwaSlug,
  currentChapter,
  hasPrev,
  hasNext,
  prevChapter,
  nextChapter,
  totalChapters,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="sticky bottom-0 z-40 bg-bg-secondary/95 backdrop-blur-md border-t border-border">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Previous */}
        {hasPrev ? (
          <Link
            href={`/${manhwaSlug}/chapter-${prevChapter}`}
            className="flex items-center gap-1 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </Link>
        ) : (
          <span className="px-4 py-2 bg-bg-card text-text-muted text-sm rounded-lg cursor-not-allowed">
            ← Prev
          </span>
        )}

        {/* Chapter selector */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-4 py-2 bg-bg-card border border-border text-text-primary text-sm rounded-lg hover:bg-border transition-colors"
          >
            Ch. {currentChapter}
            <svg className="w-3 h-3 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-48 max-h-64 overflow-y-auto bg-bg-secondary border border-border rounded-lg shadow-xl">
                {Array.from({ length: totalChapters }, (_, i) => totalChapters - i).map(
                  (num) => (
                    <Link
                      key={num}
                      href={`/${manhwaSlug}/chapter-${num}`}
                      className={`block px-4 py-2 text-sm hover:bg-bg-card transition-colors ${
                        num === currentChapter
                          ? "text-accent font-semibold bg-bg-card"
                          : "text-text-secondary"
                      }`}
                      onClick={() => setShowDropdown(false)}
                    >
                      Chapter {num}
                    </Link>
                  )
                )}
              </div>
            </>
          )}
        </div>

        {/* Next */}
        {hasNext ? (
          <Link
            href={`/${manhwaSlug}/chapter-${nextChapter}`}
            className="flex items-center gap-1 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <span className="px-4 py-2 bg-bg-card text-text-muted text-sm rounded-lg cursor-not-allowed">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}

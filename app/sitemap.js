import { getChaptersByManhwaSlug } from "@/lib/db";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://100regression.com";
const DEFAULT_SLUG = "the-max-level-players-100th-regression";

export default async function sitemap() {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/dmca`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  let chapterPages = [];
  try {
    const chapters = await getChaptersByManhwaSlug(DEFAULT_SLUG);
    chapterPages = chapters.map((ch) => ({
      url: `${BASE_URL}/${DEFAULT_SLUG}/chapter-${ch.chapterNumber}`,
      lastModified: ch.updatedAt || ch.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // DB not available, skip chapter pages
  }

  return [...staticPages, ...chapterPages];
}

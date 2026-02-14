import Image from "next/image";
import Link from "next/link";
import { getManhwaBySlug, getChaptersByManhwaSlug } from "@/lib/db";
import StarRating from "@/components/StarRating";
import ChapterList from "@/components/ChapterList";

// Default manhwa slug — this is the single-manhwa site
const DEFAULT_SLUG = "the-max-level-players-100th-regression";

export default async function HomePage() {
  let manhwa = null;
  let chapters = [];

  try {
    manhwa = await getManhwaBySlug(DEFAULT_SLUG);
    if (manhwa) {
      chapters = await getChaptersByManhwaSlug(DEFAULT_SLUG);
    }
  } catch (error) {
    console.error("Failed to fetch manhwa data:", error);
  }

  // Fallback data if DB is empty or unreachable
  if (!manhwa) {
    manhwa = {
      title: "The Max-Level Player's 100th Regression",
      slug: DEFAULT_SLUG,
      coverImage: "/cover.webp",
      alternativeTitles: "The 100th Regression of the Max-Level Player, 만렙 플레이어의 100번째 회귀",
      authors: "여운, 머프, 킹소다",
      status: "Ongoing",
      genres: ["Action", "Adventure", "Fantasy", "Mystery", "Psychological", "Shounen", "Tragedy", "Isekai"],
      rating: 5,
      views: 4403712,
      synopsis:
        "Individuals aged 15 to 25 across the globe find themselves thrust into a deadly game spanning twenty rounds. The protagonist, enabled by his unique regression capability, embarks on his 100th challenge. Having navigated the game 99 times before, he emerges with a power differential that sets him far apart from the rest. As he uncovers the condition for the final round—requiring a minimum of five participants—he strategically gathers a cohort to sidestep the repetition of past errors.",
    };
  }

  const viewsFormatted = (manhwa.views || 0).toLocaleString();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-accent text-center mb-6">
        {manhwa.title}
      </h1>

      {/* Cover & Info Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Cover Image */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="w-56 md:w-64 rounded-lg overflow-hidden border border-border shadow-lg">
            <Image
              src={manhwa.coverImage || "/cover.jpg"}
              alt={manhwa.title}
              width={256}
              height={384}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          {manhwa.alternativeTitles && (
            <p className="text-sm">
              <span className="text-text-primary font-semibold">Alternative : </span>
              <span className="text-text-secondary">{manhwa.alternativeTitles}</span>
            </p>
          )}

          {manhwa.authors && (
            <p className="text-sm">
              <span className="text-text-primary font-semibold">Author(s) : </span>
              <span className="text-text-secondary">{manhwa.authors}</span>
            </p>
          )}

          <p className="text-sm">
            <span className="text-text-primary font-semibold">Status : </span>
            <span className="text-text-secondary">{manhwa.status || "Ongoing"}</span>
          </p>

          {manhwa.genres && (
            <p className="text-sm">
              <span className="text-text-primary font-semibold">Genres : </span>
              <span className="text-text-secondary">
                {Array.isArray(manhwa.genres) ? manhwa.genres.join(" – ") : manhwa.genres}
              </span>
            </p>
          )}

          <p className="text-sm">
            <span className="text-text-primary font-semibold">Views : </span>
            <span className="text-text-secondary">{viewsFormatted}</span>
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-primary font-semibold">Rating : </span>
            <StarRating rating={manhwa.rating || 5} />
          </div>
        </div>
      </div>

      {/* Synopsis */}
      {manhwa.synopsis && (
        <div className="mb-8 bg-bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-semibold text-text-primary mb-2">Story :</h2>
          <p className="text-sm text-text-secondary leading-relaxed">{manhwa.synopsis}</p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mb-8">
        <p className="text-accent font-semibold text-lg mb-3">New reader? Start here:</p>
        {chapters.length > 0 ? (
          <Link
            href={`/${manhwa.slug}/chapter-1`}
            className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors shadow-lg shadow-accent/20"
          >
            First Chapter
          </Link>
        ) : (
          <span className="inline-block px-8 py-3 bg-bg-card text-text-muted font-bold rounded-lg cursor-not-allowed">
            Coming Soon
          </span>
        )}
      </div>

      {/* Chapter List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-accent text-center mb-4">All Chapters</h2>
        <ChapterList chapters={chapters} manhwaSlug={manhwa.slug} />
      </div>
    </div>
  );
}

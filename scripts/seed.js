/**
 * 100Regression — MongoDB Seed & Management Script
 *
 * Usage:
 *   node scripts/seed.js                      # Full init: upsert manhwa + indexes + insert chapters 1-81
 *   node scripts/seed.js --add-chapters 82 90 # Add chapters 82 through 90
 *   node scripts/seed.js --update-info        # Update manhwa document fields only
 *
 * Requirements:
 *   - MONGODB_URI set in ../.env.local
 *   - Edit buildChapterImages() to return real image URLs for each chapter
 */

import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load .env.local ──────────────────────────────────────────────────────────
try {
  const envPath = resolve(__dirname, "../.env.local");
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) return;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key) process.env[key] = value;
  });
} catch {
  console.error("❌ Could not read .env.local — make sure it exists in the project root.");
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const DB_NAME = "manhwa";
const MANHWA_SLUG = "the-max-level-players-100th-regression";

// ── Manhwa document ──────────────────────────────────────────────────────────
const manhwaDoc = {
  title: "The Max-Level Player's 100th Regression",
  slug: MANHWA_SLUG,
  coverImage: "/cover.webp",
  alternativeTitles:
    "The 100th Regression of the Max-Level Player, 만렙 플레이어의 100번째 회귀",
  authors: "여운, 머프, 킹소다",
  status: "Ongoing",
  genres: [
    "Action",
    "Adventure",
    "Fantasy",
    "Mystery",
    "Psychological",
    "Shounen",
    "Tragedy",
    "Isekai",
  ],
  rating: 5,
  views: 4403712,
  synopsis:
    "Individuals aged 15 to 25 across the globe find themselves thrust into a deadly game spanning twenty rounds. The protagonist, enabled by his unique regression capability, embarks on his 100th challenge. Having navigated the game 99 times before, he emerges with a power differential that sets him far apart from the rest. As he uncovers the condition for the final round—requiring a minimum of five participants—he strategically gathers a cohort to sidestep the repetition of past errors.",
};

// ── Chapter image builder ────────────────────────────────────────────────────
/**
 * Return an array of image URLs for a given chapter number.
 *
 * ✏️  EDIT THIS FUNCTION with your actual image hosting URLs.
 *
 * Common patterns:
 *   - Sequential pages:  https://cdn.example.com/chapters/chapter-{N}/001.webp
 *   - External hosts:    https://img.host.com/manga_id/chapter_hash/001.webp
 *
 * The function receives the chapter number and should return an ordered array
 * of all page image URLs for that chapter.
 */
function buildChapterImages(chapterNumber) {
  // ──────────────────────────────────────────────────────────────────────────
  // EXAMPLE: Replace this with your real image URL pattern.
  //
  // If each chapter folder is named by chapter number and pages are numbered:
  //   const baseUrl = "https://cdn.yourdomain.com/chapters";
  //   const pageCount = 15; // adjust per chapter or use a lookup
  //   return Array.from({ length: pageCount }, (_, i) =>
  //     `${baseUrl}/chapter-${chapterNumber}/${String(i + 1).padStart(3, "0")}.webp`
  //   );
  //
  // If you have a per-chapter lookup of exact URLs, use a Map or switch:
  //   const chapterMap = {
  //     1: ["https://cdn.example.com/ch1/01.webp", "https://cdn.example.com/ch1/02.webp"],
  //     2: ["https://cdn.example.com/ch2/01.webp", ...],
  //   };
  //   return chapterMap[chapterNumber] || [];
  // ──────────────────────────────────────────────────────────────────────────

  // Placeholder — returns empty so you know which chapters need real URLs
  console.warn(
    `⚠️  Chapter ${chapterNumber}: using placeholder images. Edit buildChapterImages() in seed.js with real URLs.`
  );
  return [
    `https://your-cdn.com/chapter-${chapterNumber}/001.webp`,
    `https://your-cdn.com/chapter-${chapterNumber}/002.webp`,
    `https://your-cdn.com/chapter-${chapterNumber}/003.webp`,
  ];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function ensureIndexes(db) {
  await db.collection("manhwas").createIndex({ slug: 1 }, { unique: true });
  await db
    .collection("chapters")
    .createIndex({ manhwaSlug: 1, chapterNumber: 1 }, { unique: true });
  console.log("✅ Indexes ensured");
}

async function upsertManhwa(db) {
  const result = await db.collection("manhwas").updateOne(
    { slug: manhwaDoc.slug },
    {
      $set: { ...manhwaDoc, updatedAt: new Date() },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  if (result.upsertedCount > 0) {
    console.log(`✅ Inserted manhwa: ${manhwaDoc.title}`);
  } else {
    console.log(`✅ Updated manhwa: ${manhwaDoc.title}`);
  }
}

async function insertChapters(db, from, to) {
  let inserted = 0;
  let skipped = 0;

  for (let i = from; i <= to; i++) {
    const images = buildChapterImages(i);

    try {
      await db.collection("chapters").insertOne({
        manhwaSlug: MANHWA_SLUG,
        chapterNumber: i,
        title: "",
        images,
        createdAt: new Date(Date.now() - (to - i) * 7 * 24 * 60 * 60 * 1000), // stagger dates
        updatedAt: new Date(),
      });
      inserted++;
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key — chapter already exists, skip it
        skipped++;
      } else {
        throw err;
      }
    }
  }

  console.log(
    `✅ Chapters ${from}–${to}: ${inserted} inserted, ${skipped} already existed (skipped)`
  );
}

// ── CLI entry point ──────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("🔗 Connected to MongoDB\n");

    const db = client.db(DB_NAME);

    // ── Mode: --update-info ──
    if (args[0] === "--update-info") {
      await upsertManhwa(db);
      console.log("\n🎉 Manhwa info updated!");
      return;
    }

    // ── Mode: --add-chapters <from> <to> ──
    if (args[0] === "--add-chapters") {
      const from = parseInt(args[1], 10);
      const to = parseInt(args[2], 10);

      if (isNaN(from) || isNaN(to) || from > to || from < 1) {
        console.error("❌ Usage: node scripts/seed.js --add-chapters <from> <to>");
        console.error("   Example: node scripts/seed.js --add-chapters 82 90");
        process.exit(1);
      }

      await ensureIndexes(db);
      await insertChapters(db, from, to);
      console.log("\n🎉 Chapters added!");
      return;
    }

    // ── Default mode: full initialization ──
    await ensureIndexes(db);
    await upsertManhwa(db);
    await insertChapters(db, 1, 81);

    console.log("\n🎉 Full seed complete!");
    console.log("\n📋 Database schema:");
    console.log("─────────────────────────────────────────");
    console.log("Collection: manhwas");
    console.log("  slug          String  (unique, indexed)");
    console.log("  title         String");
    console.log("  coverImage    String");
    console.log("  authors       String");
    console.log("  status        String");
    console.log("  genres        [String]");
    console.log("  rating        Number");
    console.log("  views         Number");
    console.log("  synopsis      String");
    console.log("");
    console.log("Collection: chapters");
    console.log("  manhwaSlug    String  (indexed)");
    console.log("  chapterNumber Number  (unique with manhwaSlug)");
    console.log("  title         String");
    console.log("  images        [String]");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

main();

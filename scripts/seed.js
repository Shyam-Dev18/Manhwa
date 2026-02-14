/**
 * MongoDB Seed Script
 *
 * Run: node scripts/seed.js
 *
 * Make sure MONGODB_URI is set in your .env.local file.
 * This script inserts sample manhwa and chapter data into MongoDB.
 */

import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
try {
  const envPath = resolve(__dirname, "../.env.local");
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
} catch {
  console.error("Could not read .env.local — make sure it exists.");
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const DB_NAME = "manhwa";

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(DB_NAME);

    // ── Clear existing data ──
    await db.collection("manhwas").deleteMany({});
    await db.collection("chapters").deleteMany({});
    console.log("Cleared existing data");

    // ── Insert manhwa ──
    const manhwa = {
      title: "The Max-Level Player's 100th Regression",
      slug: "the-max-level-players-100th-regression",
      coverImage: "https://i.imgur.com/placeholder-cover.jpg",
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("manhwas").insertOne(manhwa);
    console.log("Inserted manhwa:", manhwa.title);

    // ── Create indexes ──
    await db.collection("manhwas").createIndex({ slug: 1 }, { unique: true });
    await db
      .collection("chapters")
      .createIndex({ manhwaSlug: 1, chapterNumber: 1 }, { unique: true });
    console.log("Created indexes");

    // ── Insert sample chapters ──
    // Each chapter has an array of image URLs
    // Replace these with your actual image URLs from your storage
    const sampleChapters = [];

    for (let i = 1; i <= 81; i++) {
      sampleChapters.push({
        manhwaSlug: "the-max-level-players-100th-regression",
        chapterNumber: i,
        title: "",
        images: [
          // Replace these placeholder URLs with actual chapter image URLs
          // Each URL should point to a full-page manhwa image
          `https://img.manhuaus.com/image2025/manga_6540ffc2349fa/0434a9e5ccf49c34a20301c30edbf708/001.webp`,
          `https://img.manhuaus.com/image2025/manga_6540ffc2349fa/0434a9e5ccf49c34a20301c30edbf708/002.webp`,
          `https://img.manhuaus.com/image2025/manga_6540ffc2349fa/0434a9e5ccf49c34a20301c30edbf708/003.webp`,
        ],
        createdAt: new Date(Date.now() - (81 - i) * 7 * 24 * 60 * 60 * 1000), // stagger dates
        updatedAt: new Date(),
      });
    }

    await db.collection("chapters").insertMany(sampleChapters);
    console.log(`Inserted ${sampleChapters.length} chapters`);

    console.log("\n✅ Seeding complete!");
    console.log("\nMongoDB Schema:");
    console.log("─────────────────────────────────────────");
    console.log("Collection: manhwas");
    console.log("  - title: String");
    console.log("  - slug: String (unique, indexed)");
    console.log("  - coverImage: String (URL)");
    console.log("  - alternativeTitles: String");
    console.log("  - authors: String");
    console.log("  - status: String");
    console.log("  - genres: [String]");
    console.log("  - rating: Number (1-5)");
    console.log("  - views: Number");
    console.log("  - synopsis: String");
    console.log("  - createdAt: Date");
    console.log("  - updatedAt: Date");
    console.log("");
    console.log("Collection: chapters");
    console.log("  - manhwaSlug: String (indexed)");
    console.log("  - chapterNumber: Number (indexed, unique with manhwaSlug)");
    console.log("  - title: String");
    console.log("  - images: [String] (array of image URLs)");
    console.log("  - createdAt: Date");
    console.log("  - updatedAt: Date");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await client.close();
    console.log("\nDisconnected from MongoDB");
  }
}

seed();

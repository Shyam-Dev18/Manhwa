import clientPromise from "./mongodb";

const DB_NAME = "manhwa";

export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// ─── Manhwa helpers ───

export async function getManhwaBySlug(slug) {
  const db = await getDb();
  return db.collection("manhwas").findOne({ slug });
}

export async function getAllManhwas() {
  const db = await getDb();
  return db.collection("manhwas").find({}).sort({ updatedAt: -1 }).toArray();
}

export async function incrementViews(slug) {
  const db = await getDb();
  return db.collection("manhwas").updateOne(
    { slug },
    { $inc: { views: 1 } }
  );
}

// ─── Chapter helpers ───

export async function getChaptersByManhwaSlug(manhwaSlug) {
  const db = await getDb();
  return db
    .collection("chapters")
    .find({ manhwaSlug })
    .sort({ chapterNumber: -1 })
    .toArray();
}

export async function getChapter(manhwaSlug, chapterNumber) {
  const db = await getDb();
  return db.collection("chapters").findOne({
    manhwaSlug,
    chapterNumber: Number(chapterNumber),
  });
}

export async function getAdjacentChapters(manhwaSlug, chapterNumber) {
  const db = await getDb();
  const num = Number(chapterNumber);

  const [prev, next] = await Promise.all([
    db.collection("chapters").findOne(
      { manhwaSlug, chapterNumber: num - 1 }
    ),
    db.collection("chapters").findOne(
      { manhwaSlug, chapterNumber: num + 1 }
    ),
  ]);

  return { prev, next };
}

export async function getLatestChapterNumber(manhwaSlug) {
  const db = await getDb();
  const latest = await db
    .collection("chapters")
    .find({ manhwaSlug })
    .sort({ chapterNumber: -1 })
    .limit(1)
    .toArray();
  return latest[0]?.chapterNumber ?? 0;
}

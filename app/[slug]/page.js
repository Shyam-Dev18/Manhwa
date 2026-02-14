import { redirect } from "next/navigation";
import { getManhwaBySlug, getChaptersByManhwaSlug } from "@/lib/db";

// This page handles /the-max-level-players-100th-regression
// and redirects to home or shows manhwa info

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const manhwa = await getManhwaBySlug(slug);
  return {
    title: manhwa ? manhwa.title : "Manhwa Not Found",
    description: manhwa?.synopsis || "",
  };
}

export default async function ManhwaPage({ params }) {
  const { slug } = await params;

  // If it's the default manhwa, redirect to home
  if (slug === "the-max-level-players-100th-regression") {
    redirect("/");
  }

  // For other manhwas, you could show their page here
  const manhwa = await getManhwaBySlug(slug);
  if (!manhwa) {
    redirect("/");
  }

  redirect("/");
}

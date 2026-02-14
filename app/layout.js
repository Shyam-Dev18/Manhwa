import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "The Max-Level Player's 100th Regression - Read Online | 100Regression",
    template: "%s | 100Regression",
  },
  description:
    "Read The Max-Level Player's 100th Regression manhwa online for free in high quality. All chapters available.",
  keywords: [
    "manhwa",
    "manga",
    "webtoon",
    "100th regression",
    "max level player",
    "read online",
    "free manhwa",
  ],
  authors: [{ name: "Shyam", url: "https://github.com/Shyam-Dev18" }],
  creator: "Shyam",
  openGraph: {
    title: "The Max-Level Player's 100th Regression - 100Regression",
    description: "Read The Max-Level Player's 100th Regression manhwa online in high quality.",
    type: "website",
    siteName: "100Regression",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f0f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

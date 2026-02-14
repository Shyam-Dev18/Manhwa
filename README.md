# 100Regression — Manhwa Reader

A fast, SEO-optimized manhwa reading platform built with **Next.js 16**, **MongoDB**, and **Tailwind CSS 4**. Currently serving *The Max-Level Player's 100th Regression*.

**Author:** Shyam ([Shyam-Dev18](https://github.com/Shyam-Dev18))

---

## Features

- 📖 Vertical scroll reader optimized for mobile, tablet, and desktop
- ⚡ Server-side rendering for fast page loads and SEO
- 🌙 Dark theme designed for comfortable reading
- 🔍 Dynamic sitemap and robots.txt for search engines
- 📊 View counter with MongoDB
- 🧭 Chapter navigation with dropdown selector
- 📱 Fully responsive design

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Framework | Next.js 16 (App Router) |
| Database  | MongoDB                 |
| Styling   | Tailwind CSS 4          |
| Runtime   | Node.js 18+             |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [MongoDB](https://www.mongodb.com/) instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Shyam-Dev18/manhwa2.git
cd manhwa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
NEXT_PUBLIC_SITE_URL=https://100regression.com
CONTACT_EMAIL=contact@100regression.com
```

| Variable                | Description                                    |
|-------------------------|------------------------------------------------|
| `MONGODB_URI`           | MongoDB connection string (required)           |
| `NEXT_PUBLIC_SITE_URL`  | Your production URL, used in sitemap & meta    |
| `CONTACT_EMAIL`         | Contact email shown on the site                |

### 4. Seed the database

The seed script initializes the `manhwas` collection and creates indexes. You can also use it to insert or update chapters.

```bash
node scripts/seed.js
```

See the **Seed Script** section below for usage modes.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
manhwa/
├── app/
│   ├── layout.js              # Root layout with Header & Footer
│   ├── page.js                # Home page — manhwa info + chapter list
│   ├── icon.jpeg              # Favicon
│   ├── globals.css            # Global styles + Tailwind config
│   ├── robots.js              # Dynamic robots.txt
│   ├── sitemap.js             # Dynamic sitemap
│   ├── not-found.js           # 404 page
│   ├── error.js               # Error boundary
│   ├── loading.js             # Loading skeleton
│   ├── [slug]/
│   │   ├── page.js            # Manhwa page (redirects to home)
│   │   └── [chapter]/
│   │       └── page.js        # Chapter reader page
│   ├── about/page.js          # About page
│   ├── privacy/page.js        # Privacy policy
│   ├── dmca/page.js           # DMCA page
│   └── api/
│       ├── manhwa/route.js    # GET manhwa data
│       ├── chapter/route.js   # GET chapter data
│       └── views/route.js     # POST increment views
├── components/
│   ├── Header.js              # Sticky header with mobile menu
│   ├── Footer.js              # Site footer
│   ├── ChapterList.js         # Chapter listing
│   ├── ChapterNavigation.js   # Prev/Next + chapter dropdown
│   ├── ReaderImages.js        # Lazy-loaded vertical image reader
│   └── StarRating.js          # Star rating display
├── lib/
│   ├── mongodb.js             # MongoDB client singleton
│   └── db.js                  # Database query helpers
├── scripts/
│   └── seed.js                # Database seeding / chapter management
└── public/
    └── cover.webp             # Default cover image
```

## Seed Script

The seed script (`scripts/seed.js`) supports three modes:

### Initialize the database (first-time setup)

```bash
node scripts/seed.js
```

Inserts the manhwa document, creates indexes, and sets up collections. Safe to run multiple times — it uses `upsert` for the manhwa document and skips existing chapters.

### Add new chapters

```bash
node scripts/seed.js --add-chapters 82 90
```

Adds chapters 82 through 90. You must provide actual image URLs in the `buildChapterImages()` function inside `seed.js`.

### Update manhwa info

```bash
node scripts/seed.js --update-info
```

Updates the manhwa document fields (status, views, synopsis, etc.) without touching chapters.

## MongoDB Collections

### `manhwas`

| Field              | Type     | Description                          |
|--------------------|----------|--------------------------------------|
| `title`            | String   | Manhwa title                         |
| `slug`             | String   | URL-friendly slug (unique, indexed)  |
| `coverImage`       | String   | Cover image URL or path              |
| `alternativeTitles`| String   | Comma-separated alt titles           |
| `authors`          | String   | Author / Artist names                |
| `status`           | String   | `Ongoing` or `Completed`            |
| `genres`           | [String] | Genre tags                           |
| `rating`           | Number   | Rating out of 5                      |
| `views`            | Number   | Total view count                     |
| `synopsis`         | String   | Story description                    |

### `chapters`

| Field           | Type     | Description                                  |
|-----------------|----------|----------------------------------------------|
| `manhwaSlug`    | String   | Foreign key to manhwa slug (indexed)         |
| `chapterNumber` | Number   | Chapter number (unique with manhwaSlug)      |
| `title`         | String   | Optional chapter title                       |
| `images`        | [String] | Ordered array of page image URLs             |

## Deployment

This project is ready to deploy on any Node.js hosting provider:

- **VPS / Dedicated Server** — Run `npm run build && npm start` behind a reverse proxy (Nginx, Caddy)
- **Docker** — Containerize with a standard Node.js Dockerfile
- **Any Node.js PaaS** — Set environment variables and deploy

Make sure your `MONGODB_URI` and `NEXT_PUBLIC_SITE_URL` environment variables are configured in your hosting environment.

## License

This project is for personal / educational use. All manhwa content belongs to their respective creators and publishers.

---

Built by **Shyam** · [GitHub](https://github.com/Shyam-Dev18)

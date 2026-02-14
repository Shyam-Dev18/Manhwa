export const metadata = {
  title: "About Us",
  description: "Learn about 100Regression — your destination for reading The Max-Level Player's 100th Regression manhwa online.",
};

export default function AboutPage() {
  const email = process.env.CONTACT_EMAIL || "contact@100regression.com";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">About Us</h1>

      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
        <p>
          Welcome to <strong className="text-text-primary">100Regression</strong> — your go-to
          destination for reading <em>The Max-Level Player&apos;s 100th Regression</em> manhwa
          online in high quality.
        </p>

        <p>
          We are a fan-driven platform dedicated to bringing you the latest chapters of this
          incredible series. Our goal is to provide a clean, ad-light reading experience
          optimized for mobile, tablet, and desktop devices.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Our Mission</h2>
        <p>
          We believe that great stories deserve great reading experiences. Our platform is
          designed with readers in mind — featuring fast load times, a distraction-free
          vertical scroll reader, and a dark theme that&apos;s easy on the eyes during late-night
          reading sessions.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Contact</h2>
        <p>
          Have questions, feedback, or business inquiries? We&apos;d love to hear from you.
        </p>
        <p>
          Email us at:{" "}
          <a
            href={`mailto:${email}`}
            className="text-accent hover:text-accent-hover transition-colors font-medium"
          >
            {email}
          </a>
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Built By</h2>
        <p>
          This website is built and maintained by{" "}
          <a
            href="https://github.com/Shyam-Dev18"
            className="text-accent hover:text-accent-hover transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shyam
          </a>
          .
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Disclaimer</h2>
        <p>
          All content on this website belongs to their respective creators and publishers.
          We do not claim ownership of any of the manhwa content hosted on this site.
          If you are the copyright holder and wish to have your content removed, please
          visit our <a href="/dmca" className="text-accent hover:text-accent-hover transition-colors">DMCA page</a> for instructions.
        </p>
      </div>
    </div>
  );
}

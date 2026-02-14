export const metadata = {
  title: "DMCA",
  description: "DMCA takedown policy for 100Regression.",
};

export default function DmcaPage() {
  const email = process.env.CONTACT_EMAIL || "contact@100regression.com";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">DMCA Policy</h1>

      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
        <p>
          <strong className="text-text-primary">100Regression</strong> respects the intellectual
          property rights of others and expects its users to do the same. In accordance with
          the Digital Millennium Copyright Act of 1998 (&quot;DMCA&quot;), we will respond
          promptly to claims of copyright infringement.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Filing a DMCA Takedown Notice</h2>
        <p>
          If you believe that content available on our website infringes your copyright,
          please send a written notification containing the following information:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>
            A physical or electronic signature of the copyright owner or a person authorized
            to act on their behalf.
          </li>
          <li>
            Identification of the copyrighted work claimed to have been infringed.
          </li>
          <li>
            Identification of the material that is claimed to be infringing, including the
            URL or other specific location on our website.
          </li>
          <li>
            Your contact information, including your name, address, telephone number, and
            email address.
          </li>
          <li>
            A statement that you have a good faith belief that use of the material is not
            authorized by the copyright owner, its agent, or the law.
          </li>
          <li>
            A statement, under penalty of perjury, that the information in the notification
            is accurate and that you are the copyright owner or authorized to act on their behalf.
          </li>
        </ol>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Send Your Notice To</h2>
        <p>
          Please send your DMCA takedown notice to:{" "}
          <a
            href={`mailto:${email}`}
            className="text-accent hover:text-accent-hover transition-colors font-medium"
          >
            {email}
          </a>
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Response Time</h2>
        <p>
          Upon receiving a valid DMCA notice, we will remove or disable access to the
          allegedly infringing material within a reasonable time frame. We will also notify
          the content provider, if applicable.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Counter-Notification</h2>
        <p>
          If you believe that your content was removed in error, you may file a
          counter-notification. Your counter-notification must include:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Your physical or electronic signature</li>
          <li>Identification of the material that was removed and its prior location</li>
          <li>A statement under penalty of perjury that you believe the material was removed by mistake</li>
          <li>Your name, address, phone number, and consent to jurisdiction</li>
        </ul>

        <h2 className="text-lg font-semibold text-text-primary pt-4">Repeat Infringers</h2>
        <p>
          We may terminate access for users who are found to be repeat infringers.
        </p>

        <div className="mt-6 p-4 bg-bg-card border border-border rounded-lg">
          <p className="text-text-muted text-xs">
            <strong className="text-text-secondary">Disclaimer:</strong> All content on this
            website belongs to their respective creators and publishers. 100Regression does not
            claim ownership of any manhwa or comic content. We simply aggregate links and images
            that are freely available on the internet.
          </p>
        </div>
      </div>
    </div>
  );
}

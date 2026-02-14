export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for 100Regression — learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">Privacy Policy</h1>

      <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
        <p>
          <strong className="text-text-primary">Last updated:</strong> February 14, 2026
        </p>

        <p>
          At <strong className="text-text-primary">100Regression</strong> (&quot;we&quot;,
          &quot;our&quot;, &quot;us&quot;), we are committed to protecting and respecting your
          privacy. This Privacy Policy explains how we collect, use, and safeguard your
          information when you visit our website.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong className="text-text-primary">Usage Data:</strong> Pages visited, time spent, browser type, device information, and referring URLs.</li>
          <li><strong className="text-text-primary">Cookies:</strong> Small text files stored on your device to improve your browsing experience.</li>
          <li><strong className="text-text-primary">IP Address:</strong> Collected automatically for analytics and security purposes.</li>
        </ul>

        <h2 className="text-lg font-semibold text-text-primary pt-4">2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Improve and maintain our website</li>
          <li>Analyze usage patterns and trends</li>
          <li>Prevent fraud and ensure security</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-lg font-semibold text-text-primary pt-4">3. Cookies</h2>
        <p>
          We use cookies to enhance your experience. You can control cookie preferences
          through your browser settings. Disabling cookies may affect certain features
          of the website.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">4. Third-Party Services</h2>
        <p>
          We may use third-party services (such as analytics providers) that collect,
          monitor, and analyze information. These third parties have their own privacy
          policies addressing how they use such information.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">5. Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information. However,
          no method of transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">6. Children&apos;s Privacy</h2>
        <p>
          Our service is not directed to anyone under 13 years of age. We do not knowingly
          collect personal information from children under 13.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on
          this page with an updated revision date.
        </p>

        <h2 className="text-lg font-semibold text-text-primary pt-4">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:{" "}
          <a
            href="mailto:contact@100regression.com"
            className="text-accent hover:text-accent-hover transition-colors font-medium"
          >
            contact@100regression.com
          </a>
        </p>
      </div>
    </div>
  );
}

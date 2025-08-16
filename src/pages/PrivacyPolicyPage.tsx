
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
              Privacy <span className="text-brand-gold">Policy</span>
            </h1>
            <p className="mt-4 text-lg text-brand-body-text">
              Your trust is important to us. Here's how we handle your data.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none text-brand-body-text prose-headings:text-brand-navy prose-strong:text-brand-navy prose-a:text-brand-gold">
            <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>

            <p>www.kevinbrownjrinsurance.com ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

            <h3>Information We Collect</h3>
            <p>We may collect personal information from you in a variety of ways, including when you fill out a form, request a quote, or otherwise interact with the site. The types of personal information we may collect include:</p>
            <ul>
              <li><strong>Personal Identifiers:</strong> Name, email address, phone number, age.</li>
              <li><strong>Health Information:</strong> Information you voluntarily provide for the purpose of generating an accurate insurance quote.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, and other information related to your device.</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <p>We use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our website.</li>
              <li>Generate accurate insurance quotes and facilitate applications with your consent.</li>
              <li>Communicate with you, including responding to your comments, questions, and requests.</li>
              <li>Improve our services, marketing, and user experience.</li>
            </ul>

            <h3>Data Sharing and Disclosure</h3>
            <p>We do not sell, trade, or rent your personal identification information to others. We may share information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. This includes sharing necessary information with insurance carriers to generate quotes and process applications on your behalf.</p>

            <h3>Security of Your Information</h3>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h3>Your Consent</h3>
            <p>By using our site, you consent to our website's privacy policy.</p>

            <h3>Changes to Our Privacy Policy</h3>
            <p>If we decide to change our privacy policy, we will post those changes on this page. We encourage you to periodically review this page for the latest information on our privacy practices.</p>

            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:Kevin@Kevinbrownjrinsurance.com">Kevin@Kevinbrownjrinsurance.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

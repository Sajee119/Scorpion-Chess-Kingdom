import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const lastUpdated = "December 15, 2024";

  return (
    <div className="privacy-policy-page">
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
          <div className="last-updated">
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="privacy-content">
        <div className="container">
          <div className="content-wrapper">
            
            {/* Introduction */}
            <div className="policy-section">
              <h2>1. Introduction</h2>
              <p>
                Scorpion Chess ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or engage with our chess learning services.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="policy-section">
              <h2>2. Information We Collect</h2>
              
              <h3>2.1 Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul>
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials and profile information</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
                <li>Chess skill level and learning preferences</li>
              </ul>

              <h3>2.2 Usage Information</h3>
              <p>We automatically collect certain information when you use our services:</p>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>Performance data and error logs</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3>2.3 Chess-Related Data</h3>
              <p>We collect chess-specific information to improve your learning experience:</p>
              <ul>
                <li>Game history and performance statistics</li>
                <li>Learning progress and course completion data</li>
                <li>Practice session information</li>
                <li>Tournament participation and results</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="policy-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              
              <h3>3.1 Service Provision</h3>
              <ul>
                <li>Provide and maintain our chess learning services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Personalize your learning experience</li>
                <li>Track your progress and provide feedback</li>
              </ul>

              <h3>3.2 Communication</h3>
              <ul>
                <li>Send important service updates and notifications</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Provide customer service and technical support</li>
              </ul>

              <h3>3.3 Improvement and Analytics</h3>
              <ul>
                <li>Analyze usage patterns to improve our services</li>
                <li>Develop new features and content</li>
                <li>Conduct research and analytics</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="policy-section">
              <h2>4. Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
              
              <h3>4.1 Service Providers</h3>
              <p>We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you, such as:</p>
              <ul>
                <li>Payment processors and billing services</li>
                <li>Cloud hosting and data storage providers</li>
                <li>Analytics and marketing service providers</li>
                <li>Customer support and communication tools</li>
              </ul>

              <h3>4.2 Legal Requirements</h3>
              <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>

              <h3>4.3 Business Transfers</h3>
              <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.</p>
            </div>

            {/* Data Security */}
            <div className="policy-section">
              <h2>5. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="policy-section">
              <h2>6. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. The retention period depends on:</p>
              <ul>
                <li>The type of information collected</li>
                <li>The purpose for which it was collected</li>
                <li>Legal and regulatory requirements</li>
                <li>Your account status and preferences</li>
              </ul>
              <p>When we no longer need your information, we will securely delete or anonymize it.</p>
            </div>

            {/* Your Rights */}
            <div className="policy-section">
              <h2>7. Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              
              <h3>7.1 Access and Portability</h3>
              <p>You can request access to your personal information and receive a copy of the data we hold about you.</p>

              <h3>7.2 Correction and Update</h3>
              <p>You can request correction of inaccurate or incomplete personal information.</p>

              <h3>7.3 Deletion</h3>
              <p>You can request deletion of your personal information, subject to certain legal obligations.</p>

              <h3>7.4 Opt-out</h3>
              <p>You can opt out of marketing communications and certain data processing activities.</p>

              <h3>7.5 Data Portability</h3>
              <p>You can request a copy of your data in a structured, machine-readable format.</p>
            </div>

            {/* Cookies and Tracking */}
            <div className="policy-section">
              <h2>8. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:</p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve website functionality and performance</li>
              </ul>
              <p>You can control cookie settings through your browser preferences, though disabling certain cookies may affect website functionality.</p>
            </div>

            {/* Children's Privacy */}
            <div className="policy-section">
              <h2>9. Children's Privacy</h2>
              <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
            </div>

            {/* International Transfers */}
            <div className="policy-section">
              <h2>10. International Data Transfers</h2>
              <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.</p>
            </div>

            {/* Changes to Policy */}
            <div className="policy-section">
              <h2>11. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:</p>
              <ul>
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our services</li>
              </ul>
              <p>Your continued use of our services after such changes constitutes acceptance of the updated Privacy Policy.</p>
            </div>

            {/* Contact Information */}
            <div className="policy-section">
              <h2>12. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> privacy@scorpionchess.com
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> 123 Chess Street, New York, NY 10001
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="privacy-cta">
        <div className="container">
          <h2>Have Questions About Your Privacy?</h2>
          <p>We're here to help. Contact our privacy team for any concerns about your data.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <Link to="/terms" className="btn btn-secondary">Terms of Service</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './TermsOfService.css';

const TermsOfService = () => {
  const lastUpdated = "December 15, 2024";

  return (
    <div className="terms-page">
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="terms-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Please read these terms carefully before using our chess learning platform.</p>
          <div className="last-updated">
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="terms-content">
        <div className="container">
          <div className="content-wrapper">
            
            {/* Introduction */}
            <div className="terms-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Scorpion Chess ("Service," "we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms of Service ("Terms") govern your use of our website, mobile applications, and any related services provided by Scorpion Chess. Your continued use of the Service constitutes acceptance of these Terms.
              </p>
            </div>

            {/* Service Description */}
            <div className="terms-section">
              <h2>2. Description of Service</h2>
              <p>Scorpion Chess provides chess education and learning services, including but not limited to:</p>
              <ul>
                <li>Online chess courses and tutorials</li>
                <li>Personal coaching and training sessions</li>
                <li>Tournament organization and participation</li>
                <li>Chess equipment and product sales</li>
                <li>Community forums and discussion boards</li>
                <li>Mobile applications and software tools</li>
              </ul>
              <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time.</p>
            </div>

            {/* User Accounts */}
            <div className="terms-section">
              <h2>3. User Accounts and Registration</h2>
              
              <h3>3.1 Account Creation</h3>
              <p>To access certain features of the Service, you must create an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your account credentials secure</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3>3.2 Account Security</h3>
              <p>You are responsible for:</p>
              <ul>
                <li>Maintaining the confidentiality of your password</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account is secure and not shared with others</li>
                <li>Logging out of your account when using shared devices</li>
              </ul>

              <h3>3.3 Account Termination</h3>
              <p>We may terminate or suspend your account at any time for violations of these Terms or for any other reason at our sole discretion.</p>
            </div>

            {/* Acceptable Use */}
            <div className="terms-section">
              <h2>4. Acceptable Use Policy</h2>
              <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              
              <h3>4.1 Prohibited Activities</h3>
              <ul>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Upload or transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use automated systems to access the Service</li>
                <li>Share account credentials with others</li>
              </ul>

              <h3>4.2 Content Standards</h3>
              <p>When using our community features, you agree that your content will not:</p>
              <ul>
                <li>Be defamatory, abusive, or harassing</li>
                <li>Contain sexually explicit or violent material</li>
                <li>Promote illegal activities or harmful behavior</li>
                <li>Infringe on intellectual property rights</li>
                <li>Contain spam or commercial solicitations</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="terms-section">
              <h2>5. Payment and Subscription Terms</h2>
              
              <h3>5.1 Pricing and Payment</h3>
              <p>All fees are payable in advance. You agree to pay all charges incurred by your account, including applicable taxes.</p>

              <h3>5.2 Subscription Services</h3>
              <p>For subscription-based services:</p>
              <ul>
                <li>Subscriptions automatically renew unless cancelled</li>
                <li>You may cancel at any time through your account settings</li>
                <li>No refunds for partial months or unused periods</li>
                <li>Price changes will be communicated in advance</li>
              </ul>

              <h3>5.3 Refund Policy</h3>
              <p>We offer a 30-day money-back guarantee for new subscriptions. Refunds are not available for:</p>
              <ul>
                <li>Used or consumed services</li>
                <li>Physical products (unless defective)</li>
                <li>Services cancelled after 30 days</li>
                <li>Violations of these Terms</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="terms-section">
              <h2>6. Intellectual Property Rights</h2>
              
              <h3>6.1 Our Rights</h3>
              <p>The Service and its original content, features, and functionality are owned by Scorpion Chess and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

              <h3>6.2 Your Rights</h3>
              <p>You retain ownership of content you create and share, but grant us a license to use, display, and distribute your content as part of the Service.</p>

              <h3>6.3 License to Use</h3>
              <p>We grant you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes.</p>
            </div>

            {/* Privacy and Data */}
            <div className="terms-section">
              <h2>7. Privacy and Data Protection</h2>
              <p>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
              <p>By using the Service, you consent to the collection and use of your information as described in our Privacy Policy.</p>
            </div>

            {/* Disclaimers */}
            <div className="terms-section">
              <h2>8. Disclaimers and Limitations</h2>
              
              <h3>8.1 Service Availability</h3>
              <p>The Service is provided "as is" and "as available." We do not guarantee that the Service will be uninterrupted or error-free.</p>

              <h3>8.2 Educational Content</h3>
              <p>While we strive to provide accurate and helpful educational content, we do not guarantee that our courses or coaching will improve your chess skills or tournament performance.</p>

              <h3>8.3 Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, Scorpion Chess shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>
            </div>

            {/* Indemnification */}
            <div className="terms-section">
              <h2>9. Indemnification</h2>
              <p>You agree to defend, indemnify, and hold harmless Scorpion Chess and its affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:</p>
              <ul>
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit or share</li>
              </ul>
            </div>

            {/* Termination */}
            <div className="terms-section">
              <h2>10. Termination</h2>
              
              <h3>10.1 Termination by You</h3>
              <p>You may terminate your account at any time by contacting us or using the account deletion feature in your settings.</p>

              <h3>10.2 Termination by Us</h3>
              <p>We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms.</p>

              <h3>10.3 Effect of Termination</h3>
              <p>Upon termination, your right to use the Service will cease immediately. We may delete your account and data, though some information may be retained as required by law.</p>
            </div>

            {/* Governing Law */}
            <div className="terms-section">
              <h2>11. Governing Law and Dispute Resolution</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.</p>
              <p>Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
            </div>

            {/* Changes to Terms */}
            <div className="terms-section">
              <h2>12. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. We will notify users of material changes by:</p>
              <ul>
                <li>Posting the updated Terms on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our services</li>
              </ul>
              <p>Your continued use of the Service after such changes constitutes acceptance of the updated Terms.</p>
            </div>

            {/* Contact Information */}
            <div className="terms-section">
              <h2>13. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> legal@scorpionchess.com
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
      <section className="terms-cta">
        <div className="container">
          <h2>Questions About Our Terms?</h2>
          <p>Our legal team is here to help clarify any questions about our terms of service.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <Link to="/privacy" className="btn btn-secondary">Privacy Policy</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService; 
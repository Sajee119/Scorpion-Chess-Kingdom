import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faPhone, faMapMarkerAlt, faMap 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email",
      details: ["info@scorpionchess.com", "support@scorpionchess.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: faPhone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Available Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: faMapMarkerAlt,
      title: "Office",
      details: ["123 Chess Street", "New York, NY 10001", "United States"],
      description: "Visit us during business hours"
    }
  ];

  const faqs = [
    {
      question: "How do I get started with chess lessons?",
      answer: "You can start by creating a free account and browsing our course catalog. We recommend starting with our 'Chess Fundamentals' course for beginners."
    },
    {
      question: "What equipment do I need to start?",
      answer: "For online lessons, you just need a computer or mobile device with internet access. For in-person lessons, we can provide chess sets and boards."
    },
    {
      question: "Do you offer group lessons?",
      answer: "Yes! We offer both individual and group lessons. Group lessons are a great way to learn while connecting with other chess enthusiasts."
    },
    {
      question: "Can I cancel or reschedule a lesson?",
      answer: "Yes, you can reschedule or cancel lessons up to 24 hours before the scheduled time without any penalty."
    }
  ];

  return (
    <div className="contact-page">
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Have questions about our chess programs? We're here to help you on your chess journey.</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="container">
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-card">
                <div className="info-icon">
                  <FontAwesomeIcon icon={info.icon} />
                </div>
                <h3>{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
                <p className="info-description">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions about our services</p>
          </div>
          
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="office-section">
        <div className="container">
          <div className="office-content">
            <div className="office-info">
              <h2>Visit Our Office</h2>
              <p>Come visit us at our main office in New York City. We'd love to meet you in person and discuss your chess goals.</p>
              
              <div className="office-details">
                <div className="detail">
                  <span className="label">Address:</span>
                  <span>123 Chess Street, New York, NY 10001</span>
                </div>
                <div className="detail">
                  <span className="label">Hours:</span>
                  <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="detail">
                  <span className="label">Weekend:</span>
                  <span>Saturday: 10:00 AM - 4:00 PM</span>
                </div>
              </div>

              <div className="office-actions">
                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                <Link to="/coaches" className="btn btn-secondary">Meet Our Coaches</Link>
              </div>
            </div>
            
            <div className="office-map">
              <div className="map-placeholder">
                <div className="map-icon">
                  <FontAwesomeIcon icon={faMap} />
                </div>
                <p>Interactive Map</p>
                <span>123 Chess Street, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact; 
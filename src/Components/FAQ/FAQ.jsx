import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuestion, faHome, faBook, faChalkboardTeacher, 
  faTrophy, faLaptop, faCreditCard, faSearch,
  faChessBoard, faUserGraduate, faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './FAQ.css';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const faqData = {
    general: [
      {
        question: "What is Scorpion Chess?",
        answer: "Scorpion Chess is a comprehensive chess education platform that offers online courses, personal coaching, tournaments, and chess equipment. We help players of all skill levels improve their game through expert-led instruction and interactive learning experiences."
      },
      {
        question: "How do I get started?",
        answer: "Getting started is easy! Simply create a free account, browse our course catalog, and choose a course that matches your skill level. You can also book a session with one of our expert coaches or join our community forums to connect with other players."
      },
      {
        question: "What equipment do I need?",
        answer: "For online lessons, you just need a computer or mobile device with internet access. For in-person lessons, we can provide chess sets and boards. We also offer a variety of chess equipment for sale in our products section."
      },
      {
        question: "Is Scorpion Chess suitable for beginners?",
        answer: "Absolutely! We have courses and programs designed specifically for beginners. Our 'Chess Fundamentals' course is perfect for those just starting their chess journey, and our coaches are experienced in teaching players of all levels."
      }
    ],
    courses: [
      {
        question: "How do the online courses work?",
        answer: "Our online courses are self-paced and include video lessons, interactive exercises, practice games, and progress tracking. You can access your courses anytime, anywhere, and learn at your own speed."
      },
      {
        question: "Can I get a refund if I'm not satisfied?",
        answer: "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not completely satisfied with your purchase, simply contact our support team within 30 days for a full refund."
      },
      {
        question: "How long do I have access to my courses?",
        answer: "Course access varies by package. Most courses provide lifetime access, while some premium packages include ongoing updates and new content. Check the specific course details for access duration information."
      },
      {
        question: "Do you offer certificates upon completion?",
        answer: "Yes! Most of our courses offer completion certificates that you can download and share. These certificates are recognized by the chess community and can be added to your professional portfolio."
      }
    ],
    coaching: [
      {
        question: "How do I book a coaching session?",
        answer: "You can book a coaching session by browsing our coaches page, selecting a coach that matches your needs, and choosing an available time slot. Sessions can be conducted online via video call or in-person at our facilities."
      },
      {
        question: "What should I expect in my first coaching session?",
        answer: "Your first session will typically include an assessment of your current skill level, discussion of your goals, and creation of a personalized learning plan. The coach will also answer any questions you have about improving your game."
      },
      {
        question: "Can I cancel or reschedule a session?",
        answer: "Yes, you can reschedule or cancel sessions up to 24 hours before the scheduled time without any penalty. Cancellations made within 24 hours may be subject to a cancellation fee."
      },
      {
        question: "How do I choose the right coach?",
        answer: "Consider your skill level, learning goals, and preferred coaching style. Each coach has different specialties and teaching methods. You can read coach profiles, reviews, and even schedule a brief consultation to find the best fit."
      }
    ],
    tournaments: [
      {
        question: "How do I join a tournament?",
        answer: "You can browse available tournaments on our tournaments page, select one that matches your skill level and schedule, and register online. Some tournaments may require a small entry fee or membership."
      },
      {
        question: "What types of tournaments do you offer?",
        answer: "We offer various tournament formats including rapid, blitz, classical, and online tournaments. We also host special events like themed tournaments, team competitions, and youth championships."
      },
      {
        question: "Do I need to be a certain skill level to participate?",
        answer: "No! We have tournaments for all skill levels, from beginners to advanced players. Tournaments are typically categorized by rating or skill level to ensure fair competition."
      },
      {
        question: "What prizes are available?",
        answer: "Tournament prizes vary and may include cash prizes, chess equipment, course credits, or trophies. Prize information is always listed in the tournament details before registration."
      }
    ],
    technical: [
      {
        question: "What browsers are supported?",
        answer: "Our platform works best with Chrome, Firefox, Safari, and Edge. We recommend using the latest version of these browsers for the best experience."
      },
      {
        question: "Can I use the platform on mobile devices?",
        answer: "Yes! Our platform is fully responsive and works great on smartphones and tablets. You can access courses, book sessions, and participate in tournaments from any device."
      },
      {
        question: "What if I forget my password?",
        answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send you an email with instructions to create a new password."
      },
      {
        question: "How do I update my account information?",
        answer: "You can update your account information by going to your profile settings. You can change your email, password, personal details, and communication preferences at any time."
      }
    ],
    billing: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our trusted payment partners."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We never store your full credit card details on our servers."
      },
      {
        question: "Can I cancel my subscription?",
        answer: "Yes, you can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period."
      },
      {
        question: "Do you offer discounts for students?",
        answer: "Yes! We offer special discounts for students with valid student IDs. Contact our support team with your student information to receive your discount code."
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Questions', icon: faQuestion },
    { id: 'general', name: 'General', icon: faHome },
    { id: 'courses', name: 'Courses', icon: faBook },
    { id: 'coaching', name: 'Coaching', icon: faChalkboardTeacher },
    { id: 'tournaments', name: 'Tournaments', icon: faTrophy },
    { id: 'technical', name: 'Technical', icon: faLaptop },
    { id: 'billing', name: 'Billing', icon: faCreditCard }
  ];

  const toggleItem = (itemId) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = Object.entries(faqData).flatMap(([category, items]) => {
    if (activeCategory !== 'all' && category !== activeCategory) return [];
    
    return items
      .filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((item, index) => ({
        ...item,
        id: `${category}-${index}`,
        category
      }));
  });

  return (
    <div className="faq-page">
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our chess learning platform</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="faq-search">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">
                  <FontAwesomeIcon icon={category.icon} />
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="container">
          {filteredFAQs.length === 0 ? (
            <div className="no-results">
              <h3>No questions found</h3>
              <p>Try adjusting your search terms or browse all categories.</p>
            </div>
          ) : (
            <div className="faq-list">
              {filteredFAQs.map((item) => (
                <div key={item.id} className="faq-item">
                  <button
                    className={`faq-question ${openItems.has(item.id) ? 'open' : ''}`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="question-text">{item.question}</span>
                    <span className="toggle-icon">
                      {openItems.has(item.id) ? '−' : '+'}
                    </span>
                  </button>
                  {openItems.has(item.id) && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="faq-cta">
        <div className="container">
          <h2>Still Have Questions?</h2>
          <p>Can't find what you're looking for? Our support team is here to help!</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Contact Support</Link>
            <Link to="/courses" className="btn btn-secondary">Browse Courses</Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <div className="container">
          <h2>Quick Links</h2>
          <div className="links-grid">
            <Link to="/courses" className="quick-link">
              <div className="link-icon">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <h3>Browse Courses</h3>
              <p>Explore our comprehensive chess courses</p>
            </Link>
            <Link to="/coaches" className="quick-link">
              <div className="link-icon">
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </div>
              <h3>Find a Coach</h3>
              <p>Connect with expert chess coaches</p>
            </Link>
            <Link to="/tournaments" className="quick-link">
              <div className="link-icon">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <h3>Join Tournaments</h3>
              <p>Compete in chess tournaments</p>
            </Link>
            <Link to="/products" className="quick-link">
              <div className="link-icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
              <h3>Shop Equipment</h3>
              <p>Get quality chess equipment</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ; 
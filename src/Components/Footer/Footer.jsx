import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, faTwitter, faInstagram, 
  faYoutube, faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <div>
        <footer>
        <div className="footer-grid">
            <div className="footer-col">
                <div className="footer-logo">
                    <div className="footer-logo-icon">♔</div>
                    <div className="footer-logo-text">Scorpion Chess</div>
                </div>
                <p className="footer-about">Scorpion Chess is the premier online platform for chess education, helping players of all levels improve their game through expert instruction and comprehensive resources.</p>
                <div className="footer-social">
                    <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                    <a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
                    <a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                </div>
            </div>
            
            <div className="footer-col">
                <h3 className="footer-heading">Learn</h3>
                <ul className="footer-links">
                    <li><Link to="/courses">All Courses</Link></li>
                    <li><Link to="/courses">Beginner Courses</Link></li>
                    <li><Link to="/courses">Intermediate Lessons</Link></li>
                    <li><Link to="/courses">Advanced Strategies</Link></li>
                    <li><Link to="/resources">Chess Resources</Link></li>
                </ul>
            </div>
            
            <div className="footer-col">
                <h3 className="footer-heading">Resources</h3>
                <ul className="footer-links">
                    <li><Link to="/products">Chess Products</Link></li>
                    <li><Link to="/tournaments">Tournaments</Link></li>
                    <li><Link to="/blog">Chess Blog</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/resources">Practice Tools</Link></li>
                </ul>
            </div>
            
            <div className="footer-col">
                <h3 className="footer-heading">Company</h3>
                <ul className="footer-links">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/coaches">Our Coaches</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                    <li><Link to="/terms">Terms of Service</Link></li>
                </ul>
            </div>
            
            <div className="footer-col">
                <h3 className="footer-heading">Support</h3>
                <ul className="footer-links">
                    <li><Link to="/contact">Contact Support</Link></li>
                    <li><Link to="/faq">Help Center</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/contact">Report Issue</Link></li>
                </ul>
            </div>
        </div>
        
        <div className="copyright">
            <div className="copyright-content">
                <p>&copy; 2025 Scorpion Chess. All rights reserved.</p>
                <div className="copyright-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <span className="separator">|</span>
                    <Link to="/terms">Terms of Service</Link>
                    <span className="separator">|</span>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
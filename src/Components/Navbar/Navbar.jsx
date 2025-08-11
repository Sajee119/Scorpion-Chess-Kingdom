import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">♔</div>
        <div className="logo-text">SCK</div>
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href='/products'>Products</a>
        <a href="/coaches">Coaches</a>
        <a href="/tournaments">Tournaments</a>
        <a href="/about">About</a>
      </div>

      <div className={`auth-buttons ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="/login" className="btn-n btn-outline">Log In</a>
        <a href="/signup" className="btn-n btn-primary">Sign Up</a>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
};

export default Navbar;

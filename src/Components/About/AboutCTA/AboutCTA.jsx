// components/About/AboutCTA/AboutCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AboutCTA.css';

const AboutCTA = () => {
  return (
    <section className="about-cta">
      <div className="container">
        <h2>Ready to Start Your Chess Journey?</h2>
        <p>Join thousands of players who have transformed their game with Scorpion Chess</p>
        <div className="cta-buttons">
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          <Link to="/coaches" className="btn btn-secondary">Meet Our Coaches</Link>
          <Link to="/tournaments" className="btn btn-outline">Join Tournaments</Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
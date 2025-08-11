import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChessKing, faChessQueen, faChessRook, 
  faChessBishop, faChessKnight, faChessPawn,
  faBullseye, faTrophy, faChartLine, faUserGraduate,
  faBookOpen, faCheckCircle, faChess
} from '@fortawesome/free-solid-svg-icons';
import './Hero.css';

const Hero = () => {
  useEffect(() => {
    // Initialize any animations here if needed
  }, []);

  return (
    <div className="hero-container">
      <section className="hero">
        {/* Minimal floating chess pieces */}
        {[faChessKing, faChessQueen, faChessRook].map((icon, index) => (
          <div key={index} className={`floating-piece piece-${index + 1}`}>
            <FontAwesomeIcon icon={icon} />
          </div>
        ))}
        
        <div className="hero-content">
          <h1 className="hero-title">
            Elevate Your <span className="highlight">Chess Mastery</span>
          </h1>
          
          <p className="hero-subtitle">
            Professional training programs tailored to your skill level. 
            Join our community of ambitious players.
          </p>
          
          <div className="hero-stats">
            {[
              { number: "10K+", label: "Members", icon: faUserGraduate },
              { number: "50+", label: "Lessons", icon: faBookOpen },
              { number: "95%", label: "Satisfaction", icon: faCheckCircle }
            ].map((stat, index) => (
              <div key={index} className="stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">
                  <FontAwesomeIcon icon={stat.icon} /> {stat.label}
                </span>
              </div>
            ))}
          </div>
          
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              <FontAwesomeIcon icon={faChess} /> Start Training
            </Link>
            <Link to="/courses" className="btn btn-outline">
              View Programs
            </Link>
          </div>
          
          <div className="hero-features">
            {[
              { icon: faBullseye, text: "Personalized Coaching" },
              { icon: faTrophy, text: "Tournament Prep" },
              { icon: faChartLine, text: "Progress Tracking" }
            ].map((feature, index) => (
              <div key={index} className="feature">
                <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
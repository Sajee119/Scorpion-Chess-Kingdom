// components/About/MissionVision/MissionVision.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faStar } from '@fortawesome/free-solid-svg-icons';
import './MissionVision.css';

const MissionVision = () => {
  return (
    <section className="mission-vision">
      <div className="container">
        <div className="mission-vision-grid">
          <div className="mission-card">
            <div className="icon">
              <FontAwesomeIcon icon={faBullseye} />
            </div>
            <h2>Our Mission</h2>
            <p>To democratize chess education by providing accessible, high-quality coaching and resources to players of all skill levels, fostering a love for the game and developing strategic thinking skills.</p>
          </div>
          <div className="vision-card">
            <div className="icon">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <h2>Our Vision</h2>
            <p>To become the world's leading chess education platform, recognized for excellence in coaching, innovative learning methods, and building a global community of passionate chess players.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
// components/About/ValuesSection/ValuesSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, faHandshake, 
  faLightbulb, faHeart 
} from '@fortawesome/free-solid-svg-icons';
import './ValuesSection.css';

const ValuesSection = () => {
  return (
    <section className="values-section">
      <div className="container">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faGraduationCap} />
            </div>
            <h3>Excellence</h3>
            <p>We maintain the highest standards in chess education and coaching methodology.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <h3>Community</h3>
            <p>We foster a supportive and inclusive environment where every player can thrive.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <h3>Innovation</h3>
            <p>We continuously evolve our teaching methods and embrace new technologies.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3>Passion</h3>
            <p>Our love for chess drives everything we do and inspires our students.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
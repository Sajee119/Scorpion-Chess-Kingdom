// components/About/OurStory/OurStory.jsx
import React from 'react';
import './OurStory.css';

const OurStory = () => {
  return (
    <section className="our-story">
      <div className="container">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>Founded in 2009 by International Master Sarah Johnson, Scorpion Chess began as a small local chess club with a big vision. What started with just 20 students has grown into a comprehensive chess education platform serving thousands of players worldwide.</p>
          <p>Our journey has been marked by continuous innovation in chess education, from developing unique teaching methodologies to leveraging technology for enhanced learning experiences. We've organized over 50 tournaments, coached more than 10,000 students, and built a community that spans across continents.</p>
          <p>Today, Scorpion Chess stands as a testament to the power of passion, dedication, and the belief that chess is more than just a game—it's a tool for developing critical thinking, strategic planning, and life skills that extend far beyond the board.</p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
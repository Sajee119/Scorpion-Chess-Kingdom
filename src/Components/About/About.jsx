// components/About/About.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AboutHero from './AboutHero/AboutHero';
import MissionVision from './MissionVision/MissionVision';
import StatsSection from './StatsSection/StatsSection';
import OurStory from './OurStory/OurStory';
import TeamSection from './TeamSection/TeamSection';
import ValuesSection from './ValuesSection/ValuesSection';
import AboutCTA from './AboutCTA/AboutCTA';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <header>
        <Navbar />
      </header>
      <div className="layout">
        <AboutHero />
        <MissionVision />
        <StatsSection />
        <OurStory />
        <TeamSection />
        <ValuesSection />
        <AboutCTA />
      </div>
      <Footer />
    </div>
  );
};

export default About;
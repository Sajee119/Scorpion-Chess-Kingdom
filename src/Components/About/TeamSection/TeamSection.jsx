// components/About/TeamSection/TeamSection.jsx
import React from 'react';
import Coache_1 from '../../../assets/Coaches/Coache-1.jpg';
import Coache_2 from '../../../assets/Coaches/Coache-2.jpg';
import Coache_3 from '../../../assets/Coaches/Coache-3.jpg';
import Coache_4 from '../../../assets/Coaches/Coache-4.jpg';
import './TeamSection.css';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: Coache_1,
      bio: "International Master with 15+ years of chess coaching experience",
      achievements: ["International Master", "15+ years coaching", "1000+ students"]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head Coach",
      image: Coache_2,
      bio: "Grandmaster and former national champion with expertise in opening theory",
      achievements: ["Grandmaster", "National Champion", "Opening Expert"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Youth Program Director",
      image: Coache_3,
      bio: "Specialist in youth chess development and tournament organization",
      achievements: ["Youth Specialist", "Tournament Director", "Education Expert"]
    },
    {
      id: 4,
      name: "David Kim",
      role: "Technical Director",
      image: Coache_4,
      bio: "Chess software developer and online platform architect",
      achievements: ["Software Developer", "Platform Architect", "AI Integration"]
    }
  ];

  return (
    <section className="team-section">
      <div className="container">
        <h2>Meet Our Team</h2>
        <p className="team-intro">Our expert team of coaches and professionals are dedicated to your chess success</p>
        
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <div className="achievements">
                  {member.achievements.map((achievement, index) => (
                    <span key={index} className="achievement-tag">{achievement}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
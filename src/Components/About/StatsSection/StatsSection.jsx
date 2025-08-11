// components/About/StatsSection/StatsSection.jsx
import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
  const stats = [
    { number: "10,000+", label: "Students Taught" },
    { number: "50+", label: "Tournaments Organized" },
    { number: "95%", label: "Success Rate" },
    { number: "15+", label: "Years Experience" }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
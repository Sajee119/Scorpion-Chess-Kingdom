import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullseye, faChartLine, faTrophy, faLightbulb 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Coaches.css';
import Coache_1 from '../../assets/Coaches/Coache-1.jpg';
import Coache_2 from '../../assets/Coaches/Coache-2.jpg';
import Coache_3 from '../../assets/Coaches/Coache-3.jpg';
import Coache_4 from '../../assets/Coaches/Coache-4.jpg';
import Coache_5 from '../../assets/Coaches/Coache-5.jpg';
import Coache_6 from '../../assets/Coaches/Coache-6.jpg';

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Mock data for chess
  // coaches to simulate API response
  // In a real application, this data would be fetched from an API

  // Mock data for coaches
  const mockCoaches = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "International Master",
      specialty: "opening",
      level: "all",
      image: Coache_1,
      bio: "International Master with 15+ years of coaching experience. Specializes in opening theory and strategic planning.",
      rating: 4.9,
      students: 234,
      hourlyRate: 75,
      experience: "15+ years",
      achievements: ["International Master", "National Champion", "FIDE Trainer"],
      specialties: ["Opening Theory", "Strategic Planning", "Tournament Preparation"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Grandmaster",
      specialty: "tactics",
      level: "advanced",
      image: Coache_2,
      bio: "Grandmaster and former national champion. Expert in tactical combinations and calculation training.",
      rating: 4.8,
      students: 189,
      hourlyRate: 100,
      experience: "20+ years",
      achievements: ["Grandmaster", "National Champion", "Tactics Expert"],
      specialties: ["Tactical Combinations", "Calculation Training", "Advanced Strategy"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "FIDE Master",
      specialty: "youth",
      level: "beginner",
      image: Coache_3,
      bio: "Specialist in youth chess development with a passion for teaching young players the fundamentals.",
      rating: 4.9,
      students: 312,
      hourlyRate: 60,
      experience: "12+ years",
      achievements: ["FIDE Master", "Youth Specialist", "Education Expert"],
      specialties: ["Youth Development", "Fundamentals", "Tournament Organization"]
    },
    {
      id: 4,
      name: "David Kim",
      title: "International Master",
      specialty: "endgame",
      level: "intermediate",
      image: Coache_4,
      bio: "International Master specializing in endgame techniques and positional understanding.",
      rating: 4.7,
      students: 156,
      hourlyRate: 80,
      experience: "18+ years",
      achievements: ["International Master", "Endgame Expert", "Positional Play"],
      specialties: ["Endgame Techniques", "Positional Understanding", "Strategic Planning"]
    },
    {
      id: 5,
      name: "Alexandra Petrov",
      title: "Woman Grandmaster",
      specialty: "strategy",
      level: "advanced",
      image: Coache_5,
      bio: "Woman Grandmaster with expertise in strategic planning and tournament psychology.",
      rating: 4.8,
      students: 98,
      hourlyRate: 90,
      experience: "16+ years",
      achievements: ["Woman Grandmaster", "Strategic Expert", "Psychology Coach"],
      specialties: ["Strategic Planning", "Tournament Psychology", "Advanced Openings"]
    },
    {
      id: 6,
      name: "Carlos Martinez",
      title: "FIDE Master",
      specialty: "basics",
      level: "beginner",
      image: Coache_6,
      bio: "FIDE Master dedicated to teaching chess fundamentals and building strong foundations.",
      rating: 4.6,
      students: 203,
      hourlyRate: 55,
      experience: "10+ years",
      achievements: ["FIDE Master", "Fundamentals Expert", "Community Coach"],
      specialties: ["Chess Fundamentals", "Basic Tactics", "Opening Principles"]
    }
  ];

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'opening', name: 'Opening Theory' },
    { id: 'tactics', name: 'Tactics & Combinations' },
    { id: 'endgame', name: 'Endgame Techniques' },
    { id: 'strategy', name: 'Strategic Planning' },
    { id: 'youth', name: 'Youth Development' },
    { id: 'basics', name: 'Fundamentals' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCoaches(mockCoaches);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCoaches = coaches.filter(coach => {
    const specialtyMatch = selectedSpecialty === 'all' || coach.specialty === selectedSpecialty;
    const levelMatch = selectedLevel === 'all' || coach.level === selectedLevel || coach.level === 'all';
    return specialtyMatch && levelMatch;
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="coaches-page">
      <header>
        <Navbar />
      </header>
      <div className="layout">
      
      {/* Hero Section */}
      <section className="coaches-hero">
        <div className="container">
          <h1>Meet Our Expert Coaches</h1>
          <p>Learn from world-class chess coaches with proven track records of success</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Expert Coaches</span>
            </div>
            <div className="stat">
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Students Taught</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="coaches-filters">
        <div className="container">
          <div className="filter-section">
            <h3>Specialty</h3>
            <div className="filter-buttons">
              {specialties.map(specialty => (
                <button
                  key={specialty.id}
                  className={`filter-btn ${selectedSpecialty === specialty.id ? 'active' : ''}`}
                  onClick={() => setSelectedSpecialty(specialty.id)}
                >
                  {specialty.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Student Level</h3>
            <div className="filter-buttons">
              {levels.map(level => (
                <button
                  key={level.id}
                  className={`filter-btn ${selectedLevel === level.id ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="coaches-section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading coaches...</p>
            </div>
          ) : (
            <>
              <div className="coaches-grid">
                {filteredCoaches.map(coach => (
                  <div key={coach.id} className="coach-card">
                    <div className="coach-image">
                      <img src={coach.image} alt={coach.name} />
                      <div className="coach-overlay">
                        <button className="btn btn-primary">Book Session</button>
                        <button className="btn btn-secondary">View Profile</button>
                      </div>
                      <div className="coach-badge">
                        {coach.title}
                      </div>
                    </div>
                    <div className="coach-info">
                      <h3>{coach.name}</h3>
                      <p className="coach-title">{coach.title}</p>
                      <p className="coach-bio">{coach.bio}</p>
                      
                      <div className="coach-meta">
                        <div className="meta-item">
                          <span className="label">Experience:</span>
                          <span className="value">{coach.experience}</span>
                        </div>
                        <div className="meta-item">
                          <span className="label">Students:</span>
                          <span className="value">{coach.students}</span>
                        </div>
                        <div className="meta-item">
                          <span className="label">Rate:</span>
                          <span className="value">${coach.hourlyRate}/hr</span>
                        </div>
                      </div>
                      
                      <div className="coach-rating">
                        {renderStars(coach.rating)}
                        <span className="rating-text">({coach.rating})</span>
                      </div>
                      
                      <div className="coach-specialties">
                        <h4>Specialties:</h4>
                        <div className="specialties-list">
                          {coach.specialties.map((specialty, index) => (
                            <span key={index} className="specialty-tag">{specialty}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="coach-achievements">
                        <h4>Achievements:</h4>
                        <div className="achievements-list">
                          {coach.achievements.map((achievement, index) => (
                            <span key={index} className="achievement-tag">{achievement}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredCoaches.length === 0 && (
                <div className="no-coaches">
                  <h3>No coaches found</h3>
                  <p>Try adjusting your filters or check back later for new coaches.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Coaching Benefits */}
      <section className="coaching-benefits">
        <div className="container">
          <h2>Why Choose Personal Coaching?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <h3>Personalized Learning</h3>
              <p>Get customized lessons tailored to your specific needs and skill level</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3>Faster Progress</h3>
              <p>Accelerate your improvement with expert guidance and feedback</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <h3>Proven Results</h3>
              <p>Learn from coaches with track records of student success</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h3>Expert Insights</h3>
              <p>Gain insights from masters and grandmasters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="coaches-cta">
        <div className="container">
          <h2>Ready to Improve Your Game?</h2>
          <p>Book a session with one of our expert coaches and take your chess to the next level</p>
          <div className="cta-buttons">
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
            <Link to="/tournaments" className="btn btn-secondary">Join Tournaments</Link>
          </div>
        </div>
      </section>
  
      </div>
      <Footer />
    </div>
  );
};

export default Coaches;
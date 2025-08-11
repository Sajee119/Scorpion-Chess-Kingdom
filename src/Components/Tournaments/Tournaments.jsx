import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faCalendar, faMapMarkerAlt, faTrophy, 
  faUsers, faClock, faCalendarCheck 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Tournaments.css';
import ChampoinShip_2025 from '../../assets/Tournaments/Championship-2025.jpg';
import Championship from '../../assets/Tournaments/Championship.jpg';
import Youth_Tournament from '../../assets/Tournaments/Youth-Tournament.jpg';
import ChessFes from '../../assets/Tournaments/Chess-Festival.jpg';
import Women from '../../assets/Tournaments/Women-prix.jpg';
import Master from '../../assets/Tournaments/Masters.jpg'; 


const Tournaments = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tournamentCategories = [
    { id: 'all', name: 'All Tournaments' },
    { id: 'online', name: 'Online Tournaments' },
    { id: 'offline', name: 'Offline Events' },
    { id: 'youth', name: 'Youth Tournaments' },
    { id: 'senior', name: 'Senior Tournaments' },
    { id: 'women', name: 'Women\'s Events' }
  ];

  const tournamentLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'expert', name: 'Expert' }
  ];

  const tournaments = [
    {
      id: 1,
      title: "Scorpion Chess Championship 2025",
      category: "online",
      level: "advanced",
      date: "2025-03-15",
      endDate: "2025-03-20",
      location: "Online",
      prize: "$10,000",
      participants: 128,
      maxParticipants: 256,
      status: "upcoming",
      description: "The premier online chess championship featuring top players from around the world.",
      image: ChampoinShip_2025,
      registrationDeadline: "2025-03-10",
      timeControl: "15+10",
      rounds: 9
    },
    {
      id: 2,
      title: "Spring Youth Tournament",
      category: "youth",
      level: "beginner",
      date: "2025-04-05",
      endDate: "2025-04-06",
      location: "Chess Center, Downtown",
      prize: "$2,000",
      participants: 45,
      maxParticipants: 64,
      status: "upcoming",
      description: "A friendly tournament for young chess enthusiasts to showcase their skills.",
      image: Youth_Tournament,
      registrationDeadline: "2025-04-01",
      timeControl: "10+5",
      rounds: 6
    },
    {
      id: 3,
      title: "Women's Grand Prix",
      category: "women",
      level: "expert",
      date: "2025-05-20",
      endDate: "2025-05-25",
      location: "International Chess Hall",
      prize: "$15,000",
      participants: 32,
      maxParticipants: 32,
      status: "upcoming",
      description: "Exclusive tournament for women chess players with international recognition.",
      image: Women,
      registrationDeadline: "2025-05-15",
      timeControl: "90+30",
      rounds: 7
    },
    {
      id: 4,
      title: "Senior Masters Cup",
      category: "senior",
      level: "advanced",
      date: "2025-06-10",
      endDate: "2025-06-12",
      location: "Chess Club Elite",
      prize: "$5,000",
      participants: 24,
      maxParticipants: 32,
      status: "upcoming",
      description: "Tournament for experienced players aged 50+ to compete at the highest level.",
      image: Master,
      registrationDeadline: "2025-06-05",
      timeControl: "60+30",
      rounds: 5
    },
    {
      id: 5,
      title: "Online Blitz Championship",
      category: "online",
      level: "intermediate",
      date: "2025-02-28",
      endDate: "2025-02-28",
      location: "Online",
      prize: "$3,000",
      participants: 156,
      maxParticipants: 200,
      status: "upcoming",
      description: "Fast-paced blitz tournament with rapid time controls and exciting gameplay.",
      image: Championship,
      registrationDeadline: "2025-02-25",
      timeControl: "3+2",
      rounds: 11
    },
    {
      id: 6,
      title: "Community Chess Festival",
      category: "offline",
      level: "beginner",
      date: "2025-07-15",
      endDate: "2025-07-16",
      location: "City Park Chess Pavilion",
      prize: "$1,500",
      participants: 78,
      maxParticipants: 100,
      status: "upcoming",
      description: "Family-friendly tournament with activities for all ages and skill levels.",
      image: ChessFes,
      registrationDeadline: "2025-07-10",
      timeControl: "15+10",
      rounds: 7
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#28a745';
      case 'ongoing': return '#007bff';
      case 'completed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesCategory = selectedCategory === 'all' || tournament.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || tournament.level === selectedLevel;
    const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className='layout'>
        {/* Hero Section */}
        <section className="tournaments-hero">
          <div className="hero-content">
            <h1>Chess Tournaments</h1>
            <p>Compete, grow, and showcase your skills in our diverse range of tournaments designed for players of all levels.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{tournaments.length}</span>
                <span className="stat-label">Active Tournaments</span>
              </div>
              <div className="stat">
                <span className="stat-number">$50K+</span>
                <span className="stat-label">Total Prize Pool</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Participants</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          {/* Filters Section */}
          <section className="tournaments-filters">
            <div className="filters-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search tournaments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} />
              </div>
              
              <div className="filter-options">
                <div className="filter-group">
                  <label>Category:</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {tournamentCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Level:</label>
                  <select 
                    value={selectedLevel} 
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    {tournamentLevels.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Tournaments Grid */}
          <section className="tournaments-grid">
            {filteredTournaments.length > 0 ? (
              <div className="tournaments-list">
                {filteredTournaments.map(tournament => (
                  <div key={tournament.id} className="tournament-card">
                    <div className="tournament-image">
                      <img src={tournament.image} alt={tournament.title} />
                      <div className="tournament-overlay">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(tournament.status) }}
                        >
                          {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </span>
                        <div className="tournament-actions">
                          <button className="btn btn-primary">Register Now</button>
                          <button className="btn btn-secondary">View Details</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="tournament-content">
                      <div className="tournament-header">
                        <h3>{tournament.title}</h3>
                        <div className="tournament-meta">
                          <span className="category">{tournamentCategories.find(c => c.id === tournament.category)?.name}</span>
                          <span className="level">{tournamentLevels.find(l => l.id === tournament.level)?.name}</span>
                        </div>
                      </div>
                      
                      <p className="tournament-description">{tournament.description}</p>
                      
                      <div className="tournament-details">
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faCalendar} />
                          <span>{formatDate(tournament.date)} - {formatDate(tournament.endDate)}</span>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                          <span>{tournament.location}</span>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faTrophy} />
                          <span>Prize: {tournament.prize}</span>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faUsers} />
                          <span>{tournament.participants}/{tournament.maxParticipants} participants</span>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faClock} />
                          <span>Time Control: {tournament.timeControl}</span>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faCalendarCheck} />
                          <span>Registration until: {formatDate(tournament.registrationDeadline)}</span>
                        </div>
                      </div>
                      
                      <div className="tournament-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {Math.round((tournament.participants / tournament.maxParticipants) * 100)}% full
                        </span>
                      </div>
                      
                      <div className="tournament-footer">
                        <span className="days-until">
                          {getDaysUntil(tournament.date)} days until start
                        </span>
                        <button className="btn btn-primary">Register</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-tournaments">
                <FontAwesomeIcon icon={faSearch} />
                <h3>No tournaments found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section className="tournaments-cta">
            <div className="cta-content">
              <h2>Ready to Compete?</h2>
              <p>Join our tournaments and test your skills against players from around the world.</p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary">Create Account</Link>
                <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Tournaments
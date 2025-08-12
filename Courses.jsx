import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullseye, faChessPawn, faBolt, faFlagCheckered, faTrophy 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Mock data for courses
  const mockCourses = [
    {
      id: 1,
      title: "Chess Fundamentals",
      category: "basics",
      level: "beginner",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      price: 99.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400",
      description: "Master the basics of chess with this comprehensive course for complete beginners",
      rating: 4.8,
      students: 1247,
      lessons: 24,
      certificate: true
    },
    {
      id: 2,
      title: "Advanced Opening Theory",
      category: "openings",
      level: "advanced",
      instructor: "Michael Chen",
      duration: "12 weeks",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      description: "Deep dive into advanced opening theory and strategic concepts",
      rating: 4.9,
      students: 856,
      lessons: 36,
      certificate: true
    },
    {
      id: 3,
      title: "Tactics & Combinations",
      category: "tactics",
      level: "intermediate",
      instructor: "Emily Rodriguez",
      duration: "10 weeks",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      description: "Improve your tactical vision and calculation skills",
      rating: 4.7,
      students: 1023,
      lessons: 30,
      certificate: true
    },
    {
      id: 4,
      title: "Endgame Mastery",
      category: "endgames",
      level: "intermediate",
      instructor: "David Kim",
      duration: "6 weeks",
      price: 129.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400",
      description: "Learn essential endgame techniques and winning strategies",
      rating: 4.6,
      students: 734,
      lessons: 18,
      certificate: true
    },
    {
      id: 5,
      title: "Tournament Preparation",
      category: "strategy",
      level: "advanced",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      price: 179.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      description: "Prepare for competitive play with professional tournament strategies",
      rating: 4.8,
      students: 567,
      lessons: 24,
      certificate: true
    },
    {
      id: 6,
      title: "Youth Chess Development",
      category: "youth",
      level: "beginner",
      instructor: "Emily Rodriguez",
      duration: "16 weeks",
      price: 159.99,
      originalPrice: 219.99,
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400",
      description: "Specialized course designed for young chess players",
      rating: 4.9,
      students: 892,
      lessons: 48,
      certificate: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'basics', name: 'Fundamentals' },
    { id: 'openings', name: 'Openings' },
    { id: 'tactics', name: 'Tactics' },
    { id: 'endgames', name: 'Endgames' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'youth', name: 'Youth' }
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
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
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

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return '#28a745';
      case 'intermediate': return '#ffc107';
      case 'advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="courses-page">
      <header>
        <Navbar />
      </header>
      <div className="layout">
      
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="container">
          <h1>Chess Courses</h1>
          <p>Master the game of chess with our comprehensive courses designed for players of all levels</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="courses-filters">
        <div className="container">
          <div className="filter-section">
            <h3>Category</h3>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Level</h3>
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

      {/* Courses Grid */}
      <section className="courses-section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading courses...</p>
            </div>
          ) : (
            <>
              <div className="courses-grid">
                {filteredCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-image">
                      <img src={course.image} alt={course.title} />
                      <div className="course-overlay">
                        <button className="btn btn-primary">Enroll Now</button>
                        <button className="btn btn-secondary">Learn More</button>
                      </div>
                      <div className="course-badge" style={{ backgroundColor: getLevelColor(course.level) }}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </div>
                    </div>
                    <div className="course-info">
                      <h3>{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      
                      <div className="course-meta">
                        <div className="instructor">
                          <span className="label">Instructor:</span>
                          <span className="value">{course.instructor}</span>
                        </div>
                        <div className="duration">
                          <span className="label">Duration:</span>
                          <span className="value">{course.duration}</span>
                        </div>
                        <div className="lessons">
                          <span className="label">Lessons:</span>
                          <span className="value">{course.lessons}</span>
                        </div>
                      </div>
                      
                      <div className="course-rating">
                        {renderStars(course.rating)}
                        <span className="rating-text">({course.rating})</span>
                        <span className="students-count">• {course.students} students</span>
                      </div>
                      
                      <div className="course-price">
                        <div className="price-info">
                          <span className="current-price">${course.price}</span>
                          <span className="original-price">${course.originalPrice}</span>
                        </div>
                        {course.certificate && (
                          <div className="certificate-badge">
                            <span>🏆</span> Certificate
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="no-courses">
                  <h3>No courses found</h3>
                  <p>Try adjusting your filters or check back later for new courses.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Course Categories */}
      <section className="course-categories">
        <div className="container">
          <h2>Explore by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <h3>Fundamentals</h3>
              <p>Master the basics and build a strong foundation</p>
              <Link to="/courses?category=basics" className="view-btn">View Courses</Link>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faChessPawn} />
              </div>
              <h3>Openings</h3>
              <p>Learn opening theory and strategic concepts</p>
              <Link to="/courses?category=openings" className="view-btn">View Courses</Link>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <h3>Tactics</h3>
              <p>Improve your tactical vision and calculation</p>
              <Link to="/courses?category=tactics" className="view-btn">View Courses</Link>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faFlagCheckered} />
              </div>
              <h3>Endgames</h3>
              <p>Master endgame techniques and winning strategies</p>
              <Link to="/courses?category=endgames" className="view-btn">View Courses</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="courses-cta">
        <div className="container">
          <h2>Ready to Master Chess?</h2>
          <p>Join thousands of players who have transformed their game with our expert-led courses</p>
          <div className="cta-buttons">
            <Link to="/coaches" className="btn btn-primary">Find a Coach</Link>
            <Link to="/tournaments" className="btn btn-secondary">Join Tournaments</Link>
          </div>
        </div>
      </section>
    </div>
      <Footer />
    </div>
  );
};

export default Courses;
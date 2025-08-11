import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import Hero from './Hero/Hero.jsx';
import Features from './Features/Features.jsx';
import Testimonials from './Testimonials/Testimonials.jsx';
import './Home.css';
import Tournament from '../../assets/Tournaments/Masters.jpg';
import Course from '../../assets/Courses/Course.jpg';
import Coach from '../../assets/Coaches/Coache-1.jpg';

const Home = () => {
  const featuredContent = [
    {
      id: 1,
      title: "Latest Tournament Results",
      description: "Check out the winners of our recent online chess tournament",
      image: Tournament,
      category: "Tournaments",
      date: "2 days ago",
      link: "/tournaments"
    },
    {
      id: 2,
      title: "New Course: Advanced Tactics",
      description: "Master complex tactical combinations with our latest course",
      image: Course,
      category: "Courses",
      date: "1 week ago",
      link: "/courses"
    },
    {
      id: 3,
      title: "Meet Our New Grandmaster Coach",
      description: "Grandmaster Sarah Johnson joins our coaching team",
      image: Coach ,
      category: "Coaches",
      date: "3 days ago",
      link: "/coaches"
    }
  ];

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className='layout'>
        <Hero/>
        <div className="container">
          <Features />
          <Testimonials />
          
          {/* Featured Content Section */}
          <section className="featured-content">
            <div className="section-header">
              <h2>Latest Updates</h2>
              <p>Stay up to date with the latest news, courses, and events</p>
            </div>
            <div className="featured-grid">
              {featuredContent.map(item => (
                <div key={item.id} className="features-card">
                  <div className="card-image">
                    <img src={item.image} alt={item.title} />
                    <div className="card-overlay">
                      <Link to={item.link} className="btn-learn-more">Learn More</Link>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="category">{item.category}</span>
                      <span className="date">{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link to={item.link} className="read-more">Read More →</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section className="home-cta">
            <div className="cta-content">
              <h2>Ready to Start Your Chess Journey?</h2>
              <p>Join thousands of players who have transformed their game with Scorpion Chess</p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
                <Link to="/courses" className="btn btn-secondary">Browse Courses</Link>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
// Components/NotFound/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // We'll create this CSS file

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <div className="not-found-content">
        <div className="error-graphic">
          <div className="error-number">4</div>
          <div className="error-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
            </svg>
          </div>
          <div className="error-number">4</div>
        </div>
        
        <h1>Page Not Found</h1>
        
        <p className="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="action-buttons">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Go Back
          </button>
          
          <button 
            className="home-button"
            onClick={() => navigate('/')}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Return Home
          </button>
        </div>
        
        <div className="search-suggestions">
          <p>Or try searching:</p>
          <form className="search-box" onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?q=${e.target.search.value}`);
          }}>
            <input 
              type="text" 
              name="search" 
              placeholder="Search our site..." 
              aria-label="Search"
            />
            <button type="submit" className='search-button'>
              <svg viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
        </div>
        
        <div className="quick-links">
          <p>Popular pages:</p>
          <ul>
            <li><button onClick={() => navigate('/courses')}>Courses</button></li>
            <li><button onClick={() => navigate('/coaches')}>Coaches</button></li>
            <li><button onClick={() => navigate('/blog')}>Blog</button></li>
            <li><button onClick={() => navigate('/faq')}>FAQ</button></li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
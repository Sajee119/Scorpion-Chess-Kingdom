import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNewspaper, faBullseye, faBrain, faFlagCheckered, 
  faBaby, faTrophy, faBook, faSearch 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Opening Principles Every Chess Player Should Know",
      excerpt: "Mastering chess openings is crucial for success. Learn the fundamental principles that will guide your opening play and set you up for middlegame success.",
      content: "Chess openings can seem overwhelming with countless variations and lines to memorize. However, understanding the underlying principles is often more important than memorizing specific moves. In this comprehensive guide, we'll explore the ten essential opening principles that every chess player should internalize...",
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      category: "strategy",
      tags: ["openings", "beginners", "strategy"],
      publishDate: "2024-12-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600",
      featured: true
    },
    {
      id: 2,
      title: "The Psychology of Chess: How to Stay Calm Under Pressure",
      excerpt: "Mental strength is just as important as tactical skill in chess. Discover techniques to maintain composure during critical moments in your games.",
      content: "Chess is not just a game of tactics and strategy—it's also a mental battle. The ability to stay calm and focused under pressure can be the difference between victory and defeat. Many players find themselves making mistakes not because they don't see the right move, but because they're overwhelmed by the pressure...",
      author: "Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      category: "psychology",
      tags: ["psychology", "mental-game", "tournaments"],
      publishDate: "2024-12-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      featured: false
    },
    {
      id: 3,
      title: "Endgame Mastery: Converting Winning Positions",
      excerpt: "Learn the essential endgame techniques that will help you convert winning positions into victories, even when time is running short.",
      content: "The endgame is where many games are won or lost. Even the most beautiful middlegame combinations can be wasted if you don't know how to finish the job. In this article, we'll focus on practical endgame techniques that every player should master...",
      author: "David Kim",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      category: "endgames",
      tags: ["endgames", "technique", "advanced"],
      publishDate: "2024-12-10",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
      featured: false
    },
    {
      id: 4,
      title: "Youth Chess Development: Building Champions from an Early Age",
      excerpt: "Discover how structured chess education can develop critical thinking skills and create a foundation for lifelong learning in young players.",
      content: "Chess is an excellent tool for youth development, offering benefits that extend far beyond the board. From improving concentration to developing strategic thinking, chess can play a crucial role in a child's cognitive development...",
      author: "Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      category: "youth",
      tags: ["youth", "education", "development"],
      publishDate: "2024-12-08",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
      featured: false
    },
    {
      id: 5,
      title: "Tournament Preparation: A Complete Guide for Competitive Players",
      excerpt: "Get ready for your next tournament with our comprehensive preparation guide covering everything from opening preparation to mental readiness.",
      content: "Tournament preparation is a crucial aspect of competitive chess that many players overlook. Success in tournaments requires more than just good chess—it requires proper preparation, both technical and mental...",
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      category: "tournaments",
      tags: ["tournaments", "preparation", "competitive"],
      publishDate: "2024-12-05",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600",
      featured: false
    },
    {
      id: 6,
      title: "The Evolution of Chess: From Ancient India to Modern AI",
      excerpt: "Explore the fascinating history of chess and how the game has evolved over centuries, culminating in today's AI-powered analysis tools.",
      content: "Chess has a rich and fascinating history that spans over 1,500 years. From its origins in ancient India to the modern era of computer chess and AI analysis, the game has undergone remarkable transformations...",
      author: "Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      category: "history",
      tags: ["history", "evolution", "AI"],
      publishDate: "2024-12-03",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: faNewspaper },
    { id: 'strategy', name: 'Strategy', icon: faBullseye },
    { id: 'psychology', name: 'Psychology', icon: faBrain },
    { id: 'endgames', name: 'Endgames', icon: faFlagCheckered },
    { id: 'youth', name: 'Youth Development', icon: faBaby },
    { id: 'tournaments', name: 'Tournaments', icon: faTrophy },
    { id: 'history', name: 'History', icon: faBook }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = regularPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-page">
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <h1>Chess Blog</h1>
          <p>Insights, strategies, and stories from the world of chess</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="blog-search">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">
                  <FontAwesomeIcon icon={category.icon} />
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <div className="container">
            <h2>Featured Article</h2>
            <div className="featured-card">
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
                <div className="featured-badge">Featured</div>
              </div>
              <div className="featured-content">
                <div className="post-meta">
                  <span className="category">{featuredPost.category}</span>
                  <span className="date">{formatDate(featuredPost.publishDate)}</span>
                  <span className="read-time">{featuredPost.readTime}</span>
                </div>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.excerpt}</p>
                <div className="author-info">
                  <img src={featuredPost.authorImage} alt={featuredPost.author} />
                  <span>{featuredPost.author}</span>
                </div>
                <Link to={`/blog/${featuredPost.id}`} className="read-more-btn">
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="blog-posts">
        <div className="container">
          <h2>Latest Articles</h2>
          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or browse all categories.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                <article key={post.id} className="post-card">
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                    <div className="post-overlay">
                      <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
                    </div>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="category">{post.category}</span>
                      <span className="date">{formatDate(post.publishDate)}</span>
                      <span className="read-time">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="author-info">
                        <img src={post.authorImage} alt={post.author} />
                        <span>{post.author}</span>
                      </div>
                      <div className="post-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-signup">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest chess insights, strategies, and news delivered to your inbox.</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
            <p className="newsletter-note">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="popular-topics">
        <div className="container">
          <h2>Popular Topics</h2>
          <div className="topics-grid">
            <Link to="/blog?category=strategy" className="topic-card">
              <div className="topic-icon">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <h3>Strategy</h3>
              <p>Master the art of chess strategy</p>
            </Link>
            <Link to="/blog?category=psychology" className="topic-card">
              <div className="topic-icon">
                <FontAwesomeIcon icon={faBrain} />
              </div>
              <h3>Psychology</h3>
              <p>Mental game and tournament psychology</p>
            </Link>
            <Link to="/blog?category=endgames" className="topic-card">
              <div className="topic-icon">
                <FontAwesomeIcon icon={faFlagCheckered} />
              </div>
              <h3>Endgames</h3>
              <p>Essential endgame techniques</p>
            </Link>
            <Link to="/blog?category=youth" className="topic-card">
              <div className="topic-icon">
                <FontAwesomeIcon icon={faBaby} />
              </div>
              <h3>Youth Development</h3>
              <p>Chess education for young players</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog; 
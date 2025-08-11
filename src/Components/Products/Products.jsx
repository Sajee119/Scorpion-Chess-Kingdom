import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChessPawn, faBook, faLaptop, faBolt 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Products.css';
import premium_chess_set from '../../assets/Products/Premium-Chess-Set.jpg';
import strategy from '../../assets/Products/Chess-Strategy-Book.jpg';
import Opening from '../../assets/Products/Opening-Repertoire-Course.jpg';
import ChessClock from '../../assets/Products/Digital-Chess-Clock.jpg';
import ChessBoardMat from '../../assets/Products/Chess-Board-Mat.jpg';
import ChessAnalysisSoftware from '../../assets/Products/Chess-Analysis-Software.jpg';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: "Premium Chess Set",
      category: "equipment",
      price: 89.99,
      image: premium_chess_set,
      description: "Professional tournament-grade chess set with weighted pieces",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Chess Strategy Book",
      category: "books",
      price: 24.99,
      image: strategy,
      description: "Comprehensive guide to advanced chess strategies",
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: "Digital Chess Clock",
      category: "equipment",
      price: 45.99,
      image: ChessClock,
      description: "Tournament-approved digital chess clock with multiple time controls",
      rating: 4.9,
      reviews: 156
    },
    {
      id: 4,
      name: "Chess Board Mat",
      category: "equipment",
      price: 19.99,
      image: ChessBoardMat,
      description: "Roll-up tournament chess board with non-slip backing",
      rating: 4.5,
      reviews: 67
    },
    {
      id: 5,
      name: "Opening Repertoire Course",
      category: "courses",
      price: 149.99,
      image: Opening,
      description: "Complete opening repertoire for intermediate players",
      rating: 4.7,
      reviews: 203
    },
    {
      id: 6,
      name: "Chess Analysis Software",
      category: "software",
      price: 79.99,
      image: ChessAnalysisSoftware,
      description: "Professional chess analysis and training software",
      rating: 4.8,
      reviews: 178
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'equipment', name: 'Chess Equipment' },
    { id: 'books', name: 'Books & Literature' },
    { id: 'courses', name: 'Online Courses' },
    { id: 'software', name: 'Software & Apps' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
    <div className="products-page">
      <header>
        <Navbar />
      </header>
      <div className="layout">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <h1>Chess Products & Equipment</h1>
          <p>Discover premium chess equipment, books, courses, and software to enhance your game</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="container">
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
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="product-overlay">
                        <button className="btn btn-primary">Add to Cart</button>
                        <button className="btn btn-secondary">Quick View</button>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-rating">
                        {renderStars(product.rating)}
                        <span className="rating-text">({product.reviews} reviews)</span>
                      </div>
                      <div className="product-price">
                        <span className="price">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try selecting a different category or check back later for new products.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faChessPawn} />
              </div>
              <h3>Chess Sets</h3>
              <p>Professional tournament sets and casual playing pieces</p>
              <Link to="/products?category=equipment" className="btn btn-outline">Shop Now</Link>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <h3>Books & Literature</h3>
              <p>Strategy books, opening guides, and chess literature</p>
              <Link to="/products?category=books" className="btn btn-outline">Shop Now</Link>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faLaptop} />
              </div>
              <h3>Online Courses</h3>
              <p>Interactive courses for all skill levels</p>
              <Link to="/products?category=courses" className="btn btn-outline">Shop Now</Link>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <h3>Software & Apps</h3>
              <p>Analysis tools and training applications</p>
              <Link to="/products?category=software" className="btn btn-outline">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="products-cta">
        <div className="container">
          <h2>Ready to Improve Your Game?</h2>
          <p>Join thousands of players who have enhanced their chess skills with our premium products</p>
          <div className="cta-buttons">
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
            <Link to="/coaches" className="btn btn-secondary">Find a Coach</Link>
          </div>
        </div>
      </section>
          </div>
      <Footer />
    </div>
  );
};

export default Products; 
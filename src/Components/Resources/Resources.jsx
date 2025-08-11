import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

const Resources = () => {
  return (
    <div>
        <header>
            <Navbar />
        </header>
        <div className='layout'>
            <div className="container">
                <h1>Resources</h1>
                <p>Explore our wide range of resources designed to help you learn and grow.</p>
                <Link to="/resources" className="btn btn-primary">View Resources</Link>
                <Link to="/resources" className="btn btn-primary">Download Resources</Link> 
                <Link to="/resources" className="btn btn-primary">Share Resources</Link>    
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Resources
import React from 'react'
import './Features.css'
import Title from '../../Title/Title.jsx';
import Feature from './feature/feature.jsx';

const Features = () => {
  return (
    <div>
        <Title subTitle="Our Features" title="Why Choose Us?" />
        <div class="features-grid">
            <Feature  
                icon="fas fa-chess-knight" 
                title="Expert Coaches" 
                description="Learn from Grandmasters and International Masters with proven teaching methodologies."
            />

            <Feature  
                icon="fas fa-chalkboard-teacher" 
                title="Interactive Lessons" 
                description="Engaging video lessons with practical exercises to reinforce your learning."
            />

            <Feature  
                icon="fas fa-chart-line" 
                title="Progress Tracking" 
                description="Monitor your improvement with detailed analytics and personalized feedback."
            />

            <Feature  
                icon="fas fa-puzzle-piece" 
                title="Daily Challenges" 
                description="Sharpen your skills with curated puzzles and tactical exercises updated daily."
            />

            <Feature  
                icon="fas fa-trophy" 
                title="Tournaments" 
                description="Compete in regular tournaments with players at your skill level."
            />

            <Feature  
                icon="fas fa-mobile-alt" 
                title="Mobile Friendly" 
                description="Learn anytime, anywhere with our mobile-optimized platform."
            />

        </div>
    </div>
  )
}

export default Features
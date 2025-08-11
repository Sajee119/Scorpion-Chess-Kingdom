import React from 'react'
import './Testimonials.css';
import Testimonial from './Testimonial/Testimonial.jsx';
import Title from '../../Title/Title.jsx';
import boy from '../../../assets/User/boy.jpg';
import child from '../../../assets/User/child.jpg';
import men_1 from '../../../assets/User/men-1.jpg';
import men_2 from '../../../assets/User/men-2.jpg';
import women from '../../../assets/User/women.jpg';

const Testimonials = () => {
  return (
    <div>
        <Title subTitle="Testimonials" title="What Our Students Say" />
        <div className="testimonials-grid">
          <Testimonial
            say="Chess Academy transformed my game completely. In just 6 months, I went from a casual player to winning my local club championship!"
            img={men_1}
            author="David Wilson"
            title="Club Champion"
          />

          <Testimonial
            say="The structured courses and personalized feedback helped me break through plateaus I'd been stuck at for years. Highly recommended!"
            img={women}
            author="Sarah Johnson"
            title="Tournament Player"
          />

          <Testimonial
            say="As a beginner, I was overwhelmed by chess. Chess Academy's step-by-step approach made learning enjoyable and effective."
            img={men_1}
            author="Michael Chen"
            title="Beginner Student"
          />

        </div>
    </div>
  )
}

export default Testimonials
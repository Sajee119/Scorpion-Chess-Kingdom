import React from 'react'
import './Testimonial.css';

const Testimonial = ({say, img, author, title}) => {
  return (
    <div className='testimonial-card'>
        <p class="testimonial-text">{say}</p>
        <div class="testimonial-author">
            <img src={img} alt='' class='author-avatar'/>
            <div>
                <div class="author-name">{author}</div>
                <div class="author-title">{title}</div>
            </div>
        </div>
    </div>
  )
}

export default Testimonial
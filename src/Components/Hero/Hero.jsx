import React from 'react'
import './Hero.css'

const Hero = ({title, subtitle}) => {
  return (
    <div>
      <section class="page-hero">
        <h1 class="page-hero-title">{title}</h1>
        <p class="page-hero-subtitle">{subtitle}</p>
      </section>
    </div>
  )
}

export default Hero
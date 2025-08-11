// components/signup/signup_card/signup_card.jsx
import React from 'react'
import './signup_card.css'
import SignupHeader from '../signup_header/signup_header'
import SignupForm from '../signup_form/signup_form'
import SignupFooter from '../signup_footer/signup_footer'

const SignupCard = () => {
  return (
    <div className="signup-card">
      <SignupHeader />
      <SignupForm />
      <SignupFooter />
    </div>
  )
}

export default SignupCard
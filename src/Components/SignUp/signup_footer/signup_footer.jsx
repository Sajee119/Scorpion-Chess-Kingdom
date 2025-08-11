// components/signup/signup_footer/signup_footer.jsx
import React from 'react'
import './signup_footer.css'

const SignupFooter = () => {
  return (
    <div className="signup-footer">
      <p>
        Already have an account?{' '}
        <a href="/login" className="login-link">
          Sign in here
        </a>
      </p>
    </div>
  )
}

export default SignupFooter
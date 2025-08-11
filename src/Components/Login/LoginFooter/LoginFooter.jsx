// components/login/LoginFooter/LoginFooter.jsx
import React from 'react'
import './LoginFooter.css'

const LoginFooter = () => {
  return (
    <div className="login-footer">
      <p>
        Don't have an account?{' '}
        <a href="/signup" className="signup-link">
          Sign up here
        </a>
      </p>
    </div>
  )
}

export default LoginFooter
// components/login/LoginCard/LoginCard.jsx
import React from 'react'
import './LoginCard.css'
import LoginHeader from '../LoginHeader/LoginHeader'
import LoginForm from '../LoginForm/LoginForm'
import LoginFooter from '../LoginFooter/LoginFooter'

const LoginCard = () => {
  return (
    <div className="login-card">
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
    </div>
  )
}

export default LoginCard
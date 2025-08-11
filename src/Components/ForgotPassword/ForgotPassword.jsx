import React, { useState } from 'react'
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically make an API call to send reset email
      console.log('Password reset requested for:', email)
      
      setSuccess(true)
      
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="success-icon">✓</div>
          <div className="forgot-password-header">
            <h1>Check Your Email</h1>
            <p>We've sent a password reset link to {email}</p>
          </div>
          <div className="forgot-password-footer">
            <p>
              Didn't receive the email?{' '}
              <a href="/forgot-password" className="resend-link">
                Click here to resend
              </a>
            </p>
            <a href="/login" className="back-to-login">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h1>Forgot Password?</h1>
          <p>Enter your email address and we'll send you a link to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`forgot-password-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="forgot-password-footer">
          <p>
            Remember your password?{' '}
            <a href="/login" className="login-link">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword 
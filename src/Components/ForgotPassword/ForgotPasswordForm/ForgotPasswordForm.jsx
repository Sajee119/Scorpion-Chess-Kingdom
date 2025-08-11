// components/forgot_password/form/ForgotPasswordForm.jsx
import React from 'react';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = ({
  email,
  setEmail,
  isLoading,
  error,
  handleSubmit
}) => {
  return (
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
  );
};

export default ForgotPasswordForm;
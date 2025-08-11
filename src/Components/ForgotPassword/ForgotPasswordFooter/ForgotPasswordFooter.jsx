// components/forgot_password/footer/ForgotPasswordFooter.jsx
import React from 'react';
import './ForgotPasswordFooter.css';

const ForgotPasswordFooter = ({ showBackToLogin = false }) => {
  return (
    <div className="forgot-password-footer">
      <p>
        Remember your password?{' '}
        <a href="/login" className="login-link">
          Sign in here
        </a>
      </p>
      {showBackToLogin && (
        <a href="/login" className="back-to-login">
          Back to Login
        </a>
      )}
    </div>
  );
};

export default ForgotPasswordFooter;
// components/forgot_password/layout/ForgotPasswordLayout.jsx
import React from 'react';
import './ForgotPasswordLayout.css';

const ForgotPasswordLayout = ({ children }) => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        {children}
      </div>
    </div>
  );
};

export default ForgotPasswordLayout;
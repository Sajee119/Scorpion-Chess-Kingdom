// components/forgot_password/header/ForgotPasswordHeader.jsx
import React from 'react';
import './ForgotPasswordHeader.css';

const ForgotPasswordHeader = ({ title, description }) => {
  return (
    <div className="forgot-password-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ForgotPasswordHeader;
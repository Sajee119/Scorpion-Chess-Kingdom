// components/forgot_password/success_state/SuccessState.jsx
import React from 'react';
import './SuccessState.css';

const SuccessState = ({ email }) => {
  return (
    <>
      <div className="success-icon">✓</div>
      <ForgotPasswordHeader
        title="Check Your Email"
        description={`We've sent a password reset link to ${email}`}
      />
      <ForgotPasswordFooter showBackToLogin={true} />
    </>
  );
};

export default SuccessState;
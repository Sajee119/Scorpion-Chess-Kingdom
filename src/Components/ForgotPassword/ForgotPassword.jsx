// components/forgot_password/ForgotPassword.jsx
import React, { useState } from 'react';
import ForgotPasswordLayout from './ForgotPasswordLayout/ForgotPasswordLayout';
import ForgotPasswordHeader from './ForgotPasswordHeader/ForgotPasswordHeader';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
import ForgotPasswordFooter from './ForgotPasswordFooter/ForgotPasswordFooter';
import SuccessState from './SuccessState/SuccessState';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to send reset email
      console.log('Password reset requested for:', email);
      
      setSuccess(true);
      
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordLayout>
      {success ? (
        <SuccessState email={email} />
      ) : (
        <>
          <ForgotPasswordHeader
            title="Forgot Password?"
            description="Enter your email address and we'll send you a link to reset your password"
          />
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            error={error}
            handleSubmit={handleSubmit}
          />
          <ForgotPasswordFooter />
        </>
      )}
    </ForgotPasswordLayout>
  );
};

export default ForgotPassword;
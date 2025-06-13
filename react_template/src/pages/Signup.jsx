import React from 'react';
import { Navigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const { user } = useAuth();

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/questions'} replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create an Account
      </h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
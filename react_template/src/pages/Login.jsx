import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { user } = useAuth();

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/questions'} replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Login to MCQ System
      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;
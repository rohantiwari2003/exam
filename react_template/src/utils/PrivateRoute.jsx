import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Component for protecting routes based on user roles
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on user role if they don't have access
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/questions" replace />;
    }
  }
  
  // Render the protected route content
  return children || <Outlet />;
};

export default PrivateRoute;
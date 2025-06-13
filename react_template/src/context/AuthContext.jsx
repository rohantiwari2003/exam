import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create the context
const AuthContext = createContext();

// Mock API service for authentication
const authAPI = {
  // Mock login function
  login: async (email, password) => {
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // For demo purposes, let's simulate a server delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Super simple mock authentication
    // In a real app, you'd make an API call to a backend server
    if (email === 'admin@example.com' && password === 'password') {
      return {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
    } else if (email === 'user@example.com' && password === 'password') {
      return {
        id: '2',
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      };
    }

    // For demo purposes, create a new regular user for any other email
    // In a real app, you'd check against your database
    return {
      id: Math.floor(Math.random() * 1000).toString(),
      name: email.split('@')[0],
      email,
      role: 'user'
    };
  },

  // Mock signup function
  signup: async (name, email, password) => {
    // Simple validation
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // For demo purposes, let's simulate a server delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // In a real app, you'd make an API call to create a new user
    // For this demo, we'll assign 'admin' role if email contains 'admin'
    const role = email.includes('admin') ? 'admin' : 'user';

    return {
      id: Math.floor(Math.random() * 1000).toString(),
      name,
      email,
      role
    };
  },
};

// Provider component
export const AuthProvider = ({ children }) => {
  // Use localStorage to persist user auth state
  const [storedUser, setStoredUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const [loading, setLoading] = useState(true);

  // Set loading to false after initial check
  useEffect(() => {
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const user = await authAPI.login(email, password);
      
      // Generate mock token (in a real app, this would come from your backend)
      const mockToken = `mock-jwt-token-${Math.random().toString(36).substring(2)}`;
      
      setStoredUser(user);
      setToken(mockToken);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const user = await authAPI.signup(name, email, password);
      
      // Generate mock token
      const mockToken = `mock-jwt-token-${Math.random().toString(36).substring(2)}`;
      
      setStoredUser(user);
      setToken(mockToken);
      
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setStoredUser(null);
    setToken(null);
  };

  // Provide the context value
  const value = {
    user: storedUser,
    token,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
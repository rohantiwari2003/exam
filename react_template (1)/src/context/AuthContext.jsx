// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getUserDetails } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const userData = await getUserDetails(token);
          setUser(userData);
        }
      } catch (error) {
        // Token might be invalid or expired
        localStorage.removeItem('token');
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (name, email, password) => {
    // Convert email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase().trim();
    const userData = await registerUser(name, normalizedEmail, password);
    
    if (userData && userData.token) {
      localStorage.setItem('token', userData.token);
      setUser(userData);
      return userData;
    }
  };

  // Login user
  const login = async (email, password) => {
    // Convert email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase().trim();
    const userData = await loginUser(normalizedEmail, password);
    
    if (userData && userData.token) {
      localStorage.setItem('token', userData.token);
      setUser(userData);
      return userData;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
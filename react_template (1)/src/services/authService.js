// src/services/authService.js
// For development and production environments
const BASE_URL = window.location.hostname.includes('mgx.dev') ? 
  'https://auth-app-59rbvd-t893vd-cf5f2b.mgx.dev' : '';
const API_URL = `${BASE_URL}/api/auth/`;

// Register user
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

// Get user details
export const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${API_URL}me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get user details');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};
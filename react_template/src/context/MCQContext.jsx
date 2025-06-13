import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../utils/api';

// Create the context
const MCQContext = createContext();

// Mock MCQ data for the app (in a real app, this would come from your backend)
let mockMCQs = [
  {
    id: '1',
    title: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
    isPublished: true,
    createdAt: new Date('2023-06-10').toISOString(),
    updatedAt: new Date('2023-06-10').toISOString()
  },
  {
    id: '2',
    title: 'Which programming language is React built with?',
    options: ['Java', 'Python', 'JavaScript', 'C++'],
    correctAnswer: 'JavaScript',
    isPublished: true,
    createdAt: new Date('2023-06-15').toISOString(),
    updatedAt: new Date('2023-06-15').toISOString()
  },
  {
    id: '3',
    title: 'What year was the first iPhone released?',
    options: ['2005', '2007', '2009', '2010'],
    correctAnswer: '2007',
    isPublished: false,
    createdAt: new Date('2023-06-20').toISOString(),
    updatedAt: new Date('2023-06-20').toISOString()
  }
];

// Provider component
export const MCQProvider = ({ children }) => {
  const [mcqs, setMCQs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  // Fetch all MCQs
  const fetchMCQs = async () => {
    if (!user || !token) return [];
    
    setLoading(true);
    setError(null);
    try {
      // In a real app, you'd make an API call to fetch MCQs
      // For demo purposes, we'll use our mock data
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Only admins can see unpublished MCQs
      let data;
      if (user.role === 'admin') {
        data = [...mockMCQs];
      } else {
        data = mockMCQs.filter(mcq => mcq.isPublished);
      }
      
      setMCQs(data);
      return data;
    } catch (err) {
      setError('Failed to fetch MCQs');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single MCQ by ID
  const getMCQ = async (id) => {
    if (!user || !token) return null;
    
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find the MCQ in our mock data
      const mcq = mockMCQs.find(m => m.id === id);
      if (!mcq) {
        throw new Error('MCQ not found');
      }
      
      // Check if user has permission to access
      if (!mcq.isPublished && user.role !== 'admin') {
        throw new Error('You do not have permission to access this MCQ');
      }
      
      return mcq;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new MCQ
  const createMCQ = async (mcqData) => {
    if (!user || !token || user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new MCQ object
      const newMCQ = {
        ...mcqData,
        id: Math.floor(Math.random() * 10000).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to our mock data
      mockMCQs.push(newMCQ);
      
      // Refresh the MCQs state
      await fetchMCQs();
      
      return newMCQ;
    } catch (err) {
      setError('Failed to create MCQ');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing MCQ
  const updateMCQ = async (id, mcqData) => {
    if (!user || !token || user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find the MCQ to update
      const index = mockMCQs.findIndex(mcq => mcq.id === id);
      if (index === -1) {
        throw new Error('MCQ not found');
      }
      
      // Update the MCQ
      mockMCQs[index] = {
        ...mockMCQs[index],
        ...mcqData,
        updatedAt: new Date().toISOString()
      };
      
      // Refresh the MCQs state
      await fetchMCQs();
      
      return mockMCQs[index];
    } catch (err) {
      setError('Failed to update MCQ');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete an MCQ
  const deleteMCQ = async (id) => {
    if (!user || !token || user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter out the MCQ to delete
      mockMCQs = mockMCQs.filter(mcq => mcq.id !== id);
      
      // Refresh the MCQs state
      await fetchMCQs();
      
      return true;
    } catch (err) {
      setError('Failed to delete MCQ');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle MCQ publish status
  const toggleMCQPublish = async (id, isPublished) => {
    if (!user || !token || user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Find the MCQ to update
      const index = mockMCQs.findIndex(mcq => mcq.id === id);
      if (index === -1) {
        throw new Error('MCQ not found');
      }
      
      // Update publish status
      mockMCQs[index] = {
        ...mockMCQs[index],
        isPublished,
        updatedAt: new Date().toISOString()
      };
      
      // Refresh the MCQs state
      await fetchMCQs();
      
      return mockMCQs[index];
    } catch (err) {
      setError('Failed to update MCQ publish status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get published MCQs (for user view)
  const getPublishedMCQs = async () => {
    if (!user || !token) {
      throw new Error('Unauthorized');
    }
    
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Get only published MCQs
      const publishedMCQs = mockMCQs.filter(mcq => mcq.isPublished);
      return publishedMCQs;
    } catch (err) {
      setError('Failed to fetch published MCQs');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Submit an answer to an MCQ
  const submitAnswer = async (mcqId, answer) => {
    if (!user || !token) {
      throw new Error('Unauthorized');
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real app, you'd save this to your backend
      console.log(`User ${user.id} submitted answer "${answer}" for MCQ ${mcqId}`);
      
      // For demo purposes, let's just return true
      return true;
    } catch (err) {
      throw err;
    }
  };

  // Provide the context value
  const value = {
    mcqs,
    loading,
    error,
    fetchMCQs,
    getMCQ,
    createMCQ,
    updateMCQ,
    deleteMCQ,
    toggleMCQPublish,
    getPublishedMCQs,
    submitAnswer
  };

  return (
    <MCQContext.Provider value={value}>
      {children}
    </MCQContext.Provider>
  );
};

// Custom hook to use the MCQ context
export const useMCQ = () => {
  const context = useContext(MCQContext);
  if (!context) {
    throw new Error('useMCQ must be used within an MCQProvider');
  }
  return context;
};
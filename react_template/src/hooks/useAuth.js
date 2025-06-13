import { useAuth as useAuthContext } from '../context/AuthContext';

// Re-export the useAuth hook from the context for cleaner imports
export const useAuth = () => {
  return useAuthContext();
};
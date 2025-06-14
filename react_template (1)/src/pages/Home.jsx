// src/pages/Home.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Auth App</h1>
      
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Hey, {user.name}! You are logged in.</h2>
          <p className="text-gray-600 mb-4">Here's your account information:</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
            <p><strong>ID:</strong> {user._id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-6 text-xl">Please login or sign up to access your account.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
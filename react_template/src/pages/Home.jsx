import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          MCQ Management System
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Welcome to the Multiple Choice Questions Management System, a comprehensive platform for creating, managing, and answering multiple-choice questions.
        </p>

        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button size="lg">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            {user.role === 'admin' ? (
              <Link to="/admin/dashboard">
                <Button size="lg">
                  Go to Admin Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/questions">
                <Button size="lg">
                  View Questions
                </Button>
              </Link>
            )}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">For Administrators</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Easily create, manage, and publish multiple-choice questions. Monitor user performance and manage the system.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">For Users</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Access a wide variety of published multiple-choice questions, submit answers, and track your progress over time.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Secure & Responsive</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Experience a secure platform with role-based access control and a responsive design that works on all devices.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
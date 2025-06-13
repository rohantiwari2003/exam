import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/admin/Dashboard';
import CreateMCQ from './pages/admin/CreateMCQ';
import EditMCQ from './pages/admin/EditMCQ';
import Questions from './pages/user/Questions';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MCQProvider } from './context/MCQContext';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <MCQProvider>
            <div className="flex flex-col min-h-screen dark:bg-gray-900 transition-colors duration-200">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Admin Routes */}
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <PrivateRoute allowedRoles={['admin']}>
                        <Dashboard />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/admin/create-mcq" 
                    element={
                      <PrivateRoute allowedRoles={['admin']}>
                        <CreateMCQ />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/admin/edit-mcq/:id" 
                    element={
                      <PrivateRoute allowedRoles={['admin']}>
                        <EditMCQ />
                      </PrivateRoute>
                    } 
                  />

                  {/* User Routes */}
                  <Route 
                    path="/questions" 
                    element={
                      <PrivateRoute allowedRoles={['user', 'admin']}>
                        <Questions />
                      </PrivateRoute>
                    } 
                  />

                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </MCQProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
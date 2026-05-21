import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/Quiz';
import ProgressPage from './pages/Progress';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import TasksPage from './pages/Tasks';
import FocusPage from './pages/Focus';
import LibraryPage from './pages/Library';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/tasks" element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                } />
                <Route path="/focus" element={
                  <ProtectedRoute>
                    <FocusPage />
                  </ProtectedRoute>
                } />
                <Route path="/library" element={
                  <ProtectedRoute>
                    <LibraryPage />
                  </ProtectedRoute>
                } />
                <Route path="/quiz" element={
                  <ProtectedRoute>
                    <QuizPage />
                  </ProtectedRoute>
                } />
                <Route path="/progress" element={
                  <ProtectedRoute>
                    <ProgressPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

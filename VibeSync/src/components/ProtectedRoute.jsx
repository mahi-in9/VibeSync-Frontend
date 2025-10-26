import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Component /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.isAdmin;
  if (!token || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default AdminRoute;

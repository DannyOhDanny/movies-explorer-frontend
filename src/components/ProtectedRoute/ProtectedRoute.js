import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, redirectPath, element: Component, ...props }) => {
  return isLoggedIn ? <Component {...props} /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;

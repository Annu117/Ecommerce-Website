// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Route
      {...rest}
      element={userInfo && userInfo.isAdmin ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;

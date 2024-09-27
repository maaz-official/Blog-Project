import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux state

  return userInfo ? <Outlet /> : <Navigate to="/signin" />; // Render Outlet if authenticated, otherwise redirect to sign in
};

export default PrivateRoute;

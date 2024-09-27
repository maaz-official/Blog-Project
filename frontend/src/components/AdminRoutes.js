import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux state

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />; // Render Outlet if admin, otherwise redirect to home
};

export default AdminRoute;

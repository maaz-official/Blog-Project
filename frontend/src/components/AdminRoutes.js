import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux state

  // Check if the user has an 'admin' role or other privileged roles
  const hasAccess = userInfo && userInfo.roles && userInfo.roles.includes('admin');

  return hasAccess ? <Outlet /> : <Navigate to="/" />; // Render Outlet if the user has access, otherwise redirect to home
};

export default AdminRoute;

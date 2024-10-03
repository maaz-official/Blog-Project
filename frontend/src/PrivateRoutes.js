// src/routes/PrivateRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoutes';
import NotificationPage from './pages/NotificationPage';
import Profile from './pages/Profile';

const PrivateRoutes = () => {
  return (
    <>
      <Route element={<PrivateRoute />}>
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </>
  );
};

export default PrivateRoutes;

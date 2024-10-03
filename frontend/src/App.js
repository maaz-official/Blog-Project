// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        {PublicRoutes()}

        {/* Private Routes */}
        {PrivateRoutes()}

        {/* Admin Routes */}
        {AdminRoutes()}

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

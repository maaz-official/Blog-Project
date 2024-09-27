import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NotificationPage from './pages/NotificationPage';
import Profile from './pages/Profile';
import PostDetailed from './pages/PostDetailed';
import PrivateRoute from './components/PrivateRoutes'; // Import PrivateRoute component
import AdminRoute from './components/AdminRoutes'; // Import AdminRoute component
// import AdminDashboard from './pages/AdminDashboard'; // Example admin page

function App() {
  return (
    <div>
      {/* Navbar will be displayed on all pages */}
      <Navbar />

      {/* Routing for different pages */}
      <Routes>
        <Route index path="/" element={<HomePage />} />

        {/* Public Routes */}
        <Route path="/post/:id" element={<PostDetailed />} /> {/* Route for detailed post view */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/notifications" element={<NotificationPage />} /> {/* Private route for notifications */}
          <Route path="/@:username" element={<Profile />} /> {/* Private route for profile page */}
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> Admin route for dashboard */}
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

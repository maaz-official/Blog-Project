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

function App() {
  return (
    <div>
      {/* Navbar will be displayed on all pages */}
      <Navbar />

      {/* Routing for different pages */}
      <Routes>
      <Route index path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetailed />} /> {/* Route for detailed post view */}
        <Route path="/notifications" element={<NotificationPage />} /> {/* Add your NotificationPage route */}
        <Route path="/@:username" element={<Profile />} />  {/* Profile page route */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        {/* Add more routes as needed */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

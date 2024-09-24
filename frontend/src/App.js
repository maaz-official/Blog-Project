import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailed from './pages/PageDetailed'
import NotificationPage from './pages/NotificationPage';

function App() {
  return (
    <div>
      {/* Navbar will be displayed on all pages */}
      <Navbar />

      {/* Routing for different pages */}
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route index path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductDetailed />} /> {/* Product route with ID */}
        <Route path="/notifications" element={<NotificationPage />} /> {/* Add your NotificationPage route */}
        {/* Add more routes as needed */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

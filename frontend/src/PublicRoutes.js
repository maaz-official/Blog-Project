// src/routes/PublicRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PostDetailed from './pages/PostDetailed';

const PublicRoutes = () => {
  return (
    <>
      <Route index path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/post/:id" element={<PostDetailed />} />
    </>
  );
};

export default PublicRoutes;

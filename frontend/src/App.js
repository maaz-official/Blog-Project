// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PostDetailed from './pages/PostDetailed';
import AdminRoute from './components/AdminRoutes'; // Import Admin Route wrapper
import AdminDashboard from './pages/admin/AdminDashboard';
import ListAllPosts from './pages/admin/adminComponents/Lists/ListAllPosts';
import CreatePost from './pages/admin/adminComponents/creates/CreatePost';
import Drafts from './pages/admin/adminComponents/Lists/DraftPosts';
import ListAllUsers from './pages/admin/adminComponents/Lists/ListAllUsers';
import ListAllCategories from './pages/admin/adminComponents/Lists/ListAllCategories';
import CategoriesEditPage from './pages/admin/adminComponents/EditScreens/CategoriesEditPage';
import CreateCategoryPage from './pages/admin/adminComponents/creates/CreateCategoryPage';
import ArchivedCategoriesPage from './pages/admin/adminComponents/Lists/ArchivedCategoriesPage';
import ListAllTags from './pages/admin/adminComponents/Lists/ListAllTags';
import CreateTagPage from './pages/admin/adminComponents/creates/CreateTagsPages';
import TagsEditPage from './pages/admin/adminComponents/EditScreens/TagsEditPage';
import ArchivedTagsPage from './pages/admin/adminComponents/Lists/ArchivedTagsPage';
import NotificationPage from './pages/NotificationPage';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoutes'; // Import Private Route wrapper
import UserEditPage from './pages/admin/adminComponents/EditScreens/UserEditPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/post/:id' element={<PostDetailed />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/posts' element={<ListAllPosts />} />
          <Route path='/admin/posts/create' element={<CreatePost />} />
          <Route path='/admin/posts/drafts' element={<Drafts />} />
          <Route path='/admin/users' element={<ListAllUsers />} />
          <Route path='/admin/users/edit/:id' element={<UserEditPage />} />
          <Route path='/admin/categories' element={<ListAllCategories />} />
          <Route path='/admin/categories/edit/:id' element={<CategoriesEditPage />} />
          <Route path='/admin/categories/create' element={<CreateCategoryPage />} />
          <Route path='/admin/categories/archived' element={<ArchivedCategoriesPage />} />
          <Route path='/admin/tags' element={<ListAllTags />} />
          <Route path='/admin/tags/create' element={<CreateTagPage />} />
          <Route path='/admin/tags/edit/:id' element={<TagsEditPage />} />
          <Route path='/admin/tags/archived' element={<ArchivedTagsPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/notifications' element={<NotificationPage />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* Not Found Route */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

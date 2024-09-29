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
import ListAllPosts from './pages/admin/adminComponents/Lists/ListAllPosts';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePost from './pages/admin/adminComponents/creates/CreatePost';
import Drafts from './pages/admin/adminComponents/Lists/DraftPosts';
import ListAllUsers from './pages/admin/adminComponents/Lists/ListAllUsers';
import ListAllCategories from './pages/admin/adminComponents/Lists/ListAllCategories.js';
import NotFoundPage from './pages/NotFoundPage';
import CategoriesEditPage from './pages/admin/adminComponents/EditScreens/CategoriesEditPage.js';
import CreateCategoryPage from './pages/admin/adminComponents/creates/CreateCategoryPage.js';
import ArchivedCategoriesPage from './pages/admin/adminComponents/Lists/ArchivedCategoriesPage.js';

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
          <Route path="/profile" element={<Profile />} /> {/* Private route for profile page */}
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/posts" element={<ListAllPosts />} />
            <Route path="/admin/posts/create" element={<CreatePost />} />
            <Route path="/admin/posts/drafts" element={<Drafts />} />
            <Route path="/admin/users" element={<ListAllUsers />} />
            <Route path="/admin/categories" element={<ListAllCategories />} />
            <Route path="/admin/categories/edit/:id" element={<CategoriesEditPage />} />
            <Route path="/admin/categories/create" element={<CreateCategoryPage />} />
            <Route path="/admin/categories/archived" element={<ArchivedCategoriesPage />} /> {/* Archived Categories Page */}

        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for undefined paths */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

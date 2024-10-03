// src/routes/AdminRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoutes';
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

const AdminRoutes = () => {
  return (
    <>
      {/* All admin-related routes must be wrapped in AdminRoute */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/posts" element={<ListAllPosts />} />
        <Route path="/admin/posts/create" element={<CreatePost />} />
        <Route path="/admin/posts/drafts" element={<Drafts />} />
        <Route path="/admin/users" element={<ListAllUsers />} />
        <Route path="/admin/categories" element={<ListAllCategories />} />
        <Route path="/admin/categories/edit/:id" element={<CategoriesEditPage />} />
        <Route path="/admin/categories/create" element={<CreateCategoryPage />} />
        <Route path="/admin/categories/archived" element={<ArchivedCategoriesPage />} />
        <Route path="/admin/tags" element={<ListAllTags />} />
        <Route path="/admin/tags/create" element={<CreateTagPage />} />
        <Route path="/admin/tags/edit/:id" element={<TagsEditPage />} />
        <Route path="/admin/tags/archived" element={<ArchivedTagsPage />} />
      </Route>
    </>
  );
};

export default AdminRoutes;

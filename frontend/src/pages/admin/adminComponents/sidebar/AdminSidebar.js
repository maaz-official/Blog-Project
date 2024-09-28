import React from 'react';
import { HomeIcon, DocumentTextIcon, UserIcon, CogIcon, CollectionIcon } from '@heroicons/react/outline'; // Heroicons v1
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 flex flex-col min-h-screen shadow-lg">
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold tracking-wide">Admin Dashboard</h2>
      </div>
      <ul className="space-y-2 p-4 text-sm">
        <li>
          <Link to="/admin" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <HomeIcon className="h-5 w-5" />
            <span>Dashboard Home</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/posts" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <DocumentTextIcon className="h-5 w-5" />
            <span>Manage Posts</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <UserIcon className="h-5 w-5" />
            <span>Manage Users</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/categories" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <CollectionIcon className="h-5 w-5" />
            <span>Manage Categories</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <CogIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

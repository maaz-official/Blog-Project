import React from 'react';
import { HomeIcon, DocumentTextIcon, UserIcon, CogIcon, CollectionIcon } from '@heroicons/react/outline'; // Heroicons v1
import { Link } from 'react-router-dom';
import DashboardChart from './charts/DashboardChart'; // Import the chart component

function AdminDashboard() {
  // Sample data for now
  const postCount = 120;
  const categoryCount = 10;
  const tagCount = 30;
  const userCount = 50;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <ul className="space-y-4 p-6">
          <li>
            <Link to="/admin" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md">
              <HomeIcon className="h-6 w-6" />
              <span>Dashboard Home</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/posts" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md">
              <DocumentTextIcon className="h-6 w-6" />
              <span>Manage Posts</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md">
              <UserIcon className="h-6 w-6" />
              <span>Manage Users</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md">
              <CollectionIcon className="h-6 w-6" />
              <span>Manage Categories</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md">
              <CogIcon className="h-6 w-6" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>

        {/* Render the chart with sample data */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Overview</h3>
          <DashboardChart
            postCount={postCount}
            categoryCount={categoryCount}
            tagCount={tagCount}
            userCount={userCount}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

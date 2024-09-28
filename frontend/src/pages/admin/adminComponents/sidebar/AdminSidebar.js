import React, { useState } from 'react';
import { HomeIcon, DocumentTextIcon, UserIcon, CogIcon, CollectionIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'; // Heroicons v1
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);

  // Toggle the dropdown visibility
  const togglePostsDropdown = () => {
    setIsPostsDropdownOpen(!isPostsDropdownOpen);
  };

  return (
    <div className="bg-gray-900 text-white w-64 flex flex-col min-h-screen shadow-lg">
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold tracking-wide">Admin Dashboard</h2>
      </div>
      <ul className="space-y-2 p-4 text-sm">
        <li>
          <Link to="/admin/dashboard" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
            <HomeIcon className="h-5 w-5" />
            <span>Dashboard Home</span>
          </Link>
        </li>

        {/* Manage Posts Dropdown */}
        <li>
          <div
            className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={togglePostsDropdown}
            aria-expanded={isPostsDropdownOpen} // Accessibility for screen readers
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>Manage Posts</span>
            {isPostsDropdownOpen ? <ChevronUpIcon className="h-5 w-5 ml-auto" /> : <ChevronDownIcon className="h-5 w-5 ml-auto" />}
          </div>

          {/* Dropdown Items */}
          {isPostsDropdownOpen && (
            <ul className="pl-8 space-y-2 mt-2 transition-all ease-in-out duration-300">
              <li>
                <Link to="/admin/posts" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>List All Posts</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/posts/create" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>Create New Post</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/posts/drafts" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>View Drafts</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/admin/users" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
            <UserIcon className="h-5 w-5" />
            <span>Manage Users</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/categories" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
            <CollectionIcon className="h-5 w-5" />
            <span>Manage Categories</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
            <CogIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

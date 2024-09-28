import React, { useState } from 'react';
import { HomeIcon, DocumentTextIcon, UserIcon, CogIcon, CollectionIcon, TagIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'; // Heroicons v1
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);

  // Toggle the dropdown visibility for Posts
  const togglePostsDropdown = () => {
    setIsPostsDropdownOpen(!isPostsDropdownOpen);
  };

  // Toggle the dropdown visibility for Categories
  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
  };

  // Toggle the dropdown visibility for Tags
  const toggleTagsDropdown = () => {
    setIsTagsDropdownOpen(!isTagsDropdownOpen);
  };

  return (
    <div className="bg-gray-900 text-white w-70 flex flex-col min-h-screen shadow-lg">
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

          {/* Posts Dropdown Items */}
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

        {/* Manage Categories Dropdown */}
        <li>
          <div
            className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={toggleCategoriesDropdown}
            aria-expanded={isCategoriesDropdownOpen} // Accessibility for screen readers
          >
            <CollectionIcon className="h-5 w-5" />
            <span>Manage Categories</span>
            {isCategoriesDropdownOpen ? <ChevronUpIcon className="h-5 w-5 ml-auto" /> : <ChevronDownIcon className="h-5 w-5 ml-auto" />}
          </div>

          {/* Categories Dropdown Items */}
          {isCategoriesDropdownOpen && (
            <ul className="pl-8 space-y-2 mt-2 transition-all ease-in-out duration-300">
              <li>
                <Link to="/admin/categories" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>List All Categories</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/categories/create" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>Create New Category</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/categories/archived" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>Archived Categories</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Manage Tags Dropdown */}
        <li>
          <div
            className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={toggleTagsDropdown}
            aria-expanded={isTagsDropdownOpen} // Accessibility for screen readers
          >
            <TagIcon className="h-5 w-5" />
            <span>Manage Tags</span>
            {isTagsDropdownOpen ? <ChevronUpIcon className="h-5 w-5 ml-auto" /> : <ChevronDownIcon className="h-5 w-5 ml-auto" />}
          </div>

          {/* Tags Dropdown Items */}
          {isTagsDropdownOpen && (
            <ul className="pl-8 space-y-2 mt-2 transition-all ease-in-out duration-300">
              <li>
                <Link to="/admin/tags" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>List All Tags</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/tags/create" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>Create New Tag</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/tags/archived" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <span>Archived Tags</span>
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

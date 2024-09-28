import React from 'react';
import AdminSidebar from '../adminComponents/sidebar/AdminSidebar'; // Import your sidebar component

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100">
        {children} {/* This will render the page-specific content */}
      </div>
    </div>
  );
};

export default AdminLayout;

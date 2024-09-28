import React from 'react';
import AdminSidebar from './adminComponents/sidebar/AdminSidebar'; // Import the Sidebar component
import DashboardChart from './adminComponents/charts/DashboardChart';
import PostsChart from './adminComponents/charts/PostsChart'; // Separate component for Posts chart
import UsersChart from './adminComponents/charts/UsersChart'; // Separate component for Users chart
import CategoriesChart from './adminComponents/charts/CategoriesChart'; // Separate component for Categories chart
import TagsChart from './adminComponents/charts/TagsChart'; // Separate component for Tags chart
import { useGetUsersQuery } from '../../slices/userApiSlice'; // Import Redux Query hook
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function AdminDashboard() {
  const postCount = 120; // For simplicity, these are still hardcoded
  const categoryCount = 10;
  const tagCount = 30;

  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="error">{error?.data?.message || 'Error loading dashboard data'}</Message>;

  const userCount = users.length; // Get the user count from the API

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar /> {/* Using the Sidebar component */}

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-4xl font-semibold mb-6 text-gray-800">Welcome to Admin Dashboard</h1>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Overview Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Overview</h3>
            <DashboardChart
              postCount={postCount}
              categoryCount={categoryCount}
              tagCount={tagCount}
              userCount={userCount} // Pass dynamic user count to DashboardChart
            />
          </div>

          {/* Posts Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Posts Overview</h3>
            <PostsChart />
            <p className="text-gray-500 text-sm mt-2">Last 7 days</p>
          </div>

          {/* Users Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Users Overview</h3>
            <UsersChart users={users} /> {/* Pass real users data from Redux */}
            <p className="text-gray-500 text-sm mt-2">Last 30 days</p>
          </div>

          {/* Categories Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Categories Overview</h3>
            <CategoriesChart />
            <p className="text-gray-500 text-sm mt-2">Last 30 days</p>
          </div>

          {/* Tags Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Tags Overview</h3>
            <TagsChart />
            <p className="text-gray-500 text-sm mt-2">Last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

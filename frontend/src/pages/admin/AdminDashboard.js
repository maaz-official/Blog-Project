import React from 'react';
import AdminSidebar from './adminComponents/sidebar/AdminSidebar';
import DashboardChart from './adminComponents/charts/DashboardChart';
import PostsChart from './adminComponents/charts/PostsChart';
import UsersChart from './adminComponents/charts/UsersChart';
import CategoriesChart from './adminComponents/charts/CategoriesChart';
import TagsChart from './adminComponents/charts/TagsChart';
import { useGetUsersQuery } from '../../slices/userApiSlice';
import { useGetPostsQuery } from '../../slices/postApiSlice';
import { useGetCategoriesQuery } from '../../slices/categoryApiSlice'; // Uncomment this
// import { useGetTagsQuery } from '../../slices/tagApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function AdminDashboard() {
  // Fetch user data
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: errorUsers } = useGetUsersQuery();

  // Fetch post data
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts, error: errorPosts } = useGetPostsQuery();

  // Fetch category data
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories, error: errorCategories } = useGetCategoriesQuery();

  // Handle loading state
  if (isLoadingUsers || isLoadingPosts || isLoadingCategories) return <Loader />;

  // Handle error state
  if (isErrorUsers || isErrorPosts || isErrorCategories) {
    return (
      <Message variant="danger">
        {errorUsers?.data?.message || errorPosts?.data?.message || errorCategories?.data?.message || 'Error loading dashboard data'}
      </Message>
    );
  }

  // Calculate counts
  const userCount = users?.length || 0;
  const postCount = posts?.length || 0;
  const categoryCount = categories?.length || 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-4xl font-semibold mb-6 text-gray-800">Welcome to Admin Dashboard</h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="text-gray-700 font-bold text-lg">Posts</div>
            <div className="text-4xl font-semibold">{postCount}</div>
            <div className="text-green-500 mt-2">+10% from last week</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="text-gray-700 font-bold text-lg">Categories</div>
            <div className="text-4xl font-semibold">{categoryCount}</div>
            <div className="text-green-500 mt-2">+5% from last month</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="text-gray-700 font-bold text-lg">Users</div>
            <div className="text-4xl font-semibold">{userCount}</div>
            <div className="text-green-500 mt-2">+3% from last month</div>
          </div>
        </div>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Overview Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Overview</h3>
            <DashboardChart
              postCount={postCount}
              categoryCount={categoryCount}
              userCount={userCount}
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
            <UsersChart users={users} />
            <p className="text-gray-500 text-sm mt-2">Last 30 days</p>
          </div>

          {/* Categories Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Categories Overview</h3>
            <CategoriesChart categories={categories} /> {/* Pass real categories data */}
            <p className="text-gray-500 text-sm mt-2">Last 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

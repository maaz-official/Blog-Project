import React from 'react';
import AdminSidebar from './adminComponents/sidebar/AdminSidebar'; // Import the Sidebar component
import DashboardChart from './adminComponents/charts/DashboardChart';
import PostsChart from './adminComponents/charts/PostsChart'; // Separate component for Posts chart
import UsersChart from './adminComponents/charts/UsersChart'; // Separate component for Users chart
import CategoriesChart from './adminComponents/charts/CategoriesChart'; // Separate component for Categories chart
import TagsChart from './adminComponents/charts/TagsChart'; // Separate component for Tags chart
import { useGetUsersQuery } from '../../slices/userApiSlice'; // Import Redux Query hook for users
import { useGetPostsQuery } from '../../slices/postApiSlice'; // Import Redux Query hook for posts
// import { useGetCategoriesQuery } from '../../slices/categoryApiSlice'; // Import Redux Query hook for categories
// import { useGetTagsQuery } from '../../slices/tagApiSlice'; // Import Redux Query hook for tags
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function AdminDashboard() {
  // Fetch user data
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: errorUsers } = useGetUsersQuery();

  // Fetch post data
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts, error: errorPosts } = useGetPostsQuery();

  // Fetch category data
  // const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories, error: errorCategories } = useGetCategoriesQuery();

  // Fetch tag data
  // const { data: tags, isLoading: isLoadingTags, isError: isErrorTags, error: errorTags } = useGetTagsQuery();

  // Handle loading state
  // || isLoadingCategories || isLoadingTags
  if (isLoadingUsers || isLoadingPosts) return <Loader />;

  // Handle error state
  // || isErrorCategories || isErrorTags
  if (isErrorUsers || isErrorPosts) {
    return (
      <Message variant="danger">
         {/* || errorCategories?.data?.message || errorTags?.data?.message  */}
        {errorUsers?.data?.message || errorPosts?.data?.message || 'Error loading dashboard data'}
      </Message>
    );
  }

  // Calculate counts
  const userCount = users?.length || 0; // Fallback to 0 if users data is undefined
  const postCount = posts?.length || 0; // Fallback to 0 if posts data is undefined
  // const categoryCount = categories?.length || 0; // Fallback to 0 if categories data is undefined
  // const tagCount = tags?.length || 0; // Fallback to 0 if tags data is undefined

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar /> {/* Using the Sidebar component */}

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
          {/* <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="text-gray-700 font-bold text-lg">Categories</div>
            <div className="text-4xl font-semibold">{categoryCount}</div>
            <div className="text-green-500 mt-2">+5% from last month</div>
          </div> */}
          {/* <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="text-gray-700 font-bold text-lg">Tags</div>
            <div className="text-4xl font-semibold">{tagCount}</div>
            <div className="text-red-500 mt-2">-2% from yesterday</div>
          </div> */}
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
              // categoryCount={categoryCount}
              // tagCount={tagCount}
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

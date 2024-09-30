import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetUsersQuery } from '../../../../slices/userApiSlice'; // Import the Redux hook for users
import { useGetPostsQuery } from '../../../../slices/postApiSlice'; // Import the Redux hook for posts
import { useGetCategoriesQuery } from '../../../../slices/categoryApiSlice'; // Import the Redux hook for categories
import { useGetTagsQuery } from '../../../../slices/tagApiSlice'; // Import the Redux hook for tags
import Loader from '../../../../components/Loader'; // Custom Loader component
import Message from '../../../../components/Message'; // Custom Message component

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  // Fetch user data
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: errorUsers } = useGetUsersQuery();
  // Fetch posts data
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts, error: errorPosts } = useGetPostsQuery();
  // Fetch categories data
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories, error: errorCategories } = useGetCategoriesQuery();
  // Fetch tags data
  const { data: tags, isLoading: isLoadingTags, isError: isErrorTags, error: errorTags } = useGetTagsQuery();

  // Show loader while any data is being fetched
  if (isLoadingUsers || isLoadingPosts || isLoadingCategories || isLoadingTags) return <Loader />;

  // Handle error state with custom Message component
  if (isErrorUsers || isErrorPosts || isErrorCategories || isErrorTags) {
    return (
      <Message variant="danger">
        {errorUsers?.data?.message || errorPosts?.data?.message || errorCategories?.data?.message || errorTags?.data?.message || 'Error loading dashboard data'}
      </Message>
    );
  }

  // Calculate user, post, category, and tag counts if data is available
  const userCount = users?.length || 0; // Fallback to 0 if users data is undefined
  const postCount = posts?.length || 0; // Fallback to 0 if posts data is undefined
  const categoryCount = categories?.length || 0; // Fallback to 0 if categories data is undefined
  const tagCount = tags?.length || 0; // Fallback to 0 if tags data is undefined

  // Data for the bar chart
  const data = {
    labels: ['Posts', 'Categories', 'Tags', 'Users'],
    datasets: [
      {
        label: 'Count',
        data: [postCount, categoryCount, tagCount, userCount], // Use dynamic postCount, categoryCount, tagCount, and userCount
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Posts
          'rgba(54, 162, 235, 0.6)', // Categories
          'rgba(255, 206, 86, 0.6)', // Tags
          'rgba(153, 102, 255, 0.6)', // Users
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Admin Dashboard Overview',
      },
    },
  };

  // Render the bar chart
  return <Bar data={data} options={options} />;
};

export default DashboardChart;

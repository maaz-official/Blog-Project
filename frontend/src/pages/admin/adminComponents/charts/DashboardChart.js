import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetUsersQuery } from '../../../../slices/userApiSlice'; // Import the Redux hook
import Loader from '../../../../components/Loader';
import Message from '../../../../components/Message';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = ({ postCount, categoryCount, tagCount }) => {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="error">{error?.data?.message || 'Error loading users'}</Message>;

  const userCount = users.length; // Get the total count of users from Redux Query

  const data = {
    labels: ['Posts', 'Categories', 'Tags', 'Users'],
    datasets: [
      {
        label: 'Count',
        data: [postCount, categoryCount, tagCount, userCount], // Use dynamic userCount here
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
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

  return <Bar data={data} options={options} />;
};

export default DashboardChart;

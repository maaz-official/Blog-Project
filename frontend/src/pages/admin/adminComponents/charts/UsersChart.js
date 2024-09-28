import React from 'react';
import { Line } from 'react-chartjs-2';
import { useGetUsersQuery } from '../../../../slices/userApiSlice'; // Import the Redux hook
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Loader from '../../../../components/Loader';
import Message from '../../../../components/Message';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UsersChart = () => {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="error">{error?.data?.message || 'Error loading users'}</Message>;

  // Assuming the users data includes a creation date
  const userCountByMonth = new Array(12).fill(0);
  users.forEach((user) => {
    const month = new Date(user.createdAt).getMonth(); // Get month from user's createdAt date
    userCountByMonth[month] += 1;
  });

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Users',
        data: userCountByMonth, // Data is now dynamic from the backend
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default UsersChart;

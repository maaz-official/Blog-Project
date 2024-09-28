import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetPostsQuery } from '../../../../slices/postApiSlice'; // Import the query hook
import Loader from '../../../../components/Loader'; // Custom Loader component
import Message from '../../../../components/Message'; // Custom Message component

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PostsChart = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  // Process the posts data for the chart
  const chartData = useMemo(() => {
    if (!posts || isLoading || isError) return null;

    // Initialize an array with 7 zeros (one for each day of the week)
    const postCounts = Array(7).fill(0);
    
    // Assuming each post has a 'createdAt' field with a timestamp
    posts.forEach((post) => {
      const postDate = new Date(post.createdAt);
      const dayOfWeek = postDate.getDay(); // 0 is Sunday, 6 is Saturday
      postCounts[dayOfWeek] += 1; // Increment post count for the respective day
    });

    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Posts',
          data: postCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [posts, isLoading, isError]);

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

  if (isLoading) {
    return <Loader />; // Use your custom Loader component
  }

  if (isError || !chartData) {
    return <Message variant="danger">Error loading chart data</Message>; // Use your custom Message component
  }

  return <Bar data={chartData} options={options} />;
};

export default PostsChart;

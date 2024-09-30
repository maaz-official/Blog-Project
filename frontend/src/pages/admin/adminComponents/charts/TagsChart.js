import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetTagsQuery } from '../../../../slices/tagApiSlice'; // Import the query hook
import Loader from '../../../../components/Loader'; // Custom Loader component
import Message from '../../../../components/Message'; // Custom Message component

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TagsChart = () => {
  const { data: tags, isLoading, isError } = useGetTagsQuery();

  // Process the tags data for the chart
  const chartData = useMemo(() => {
    if (!tags || isLoading || isError) return null;

    // Initialize an array to count tags (adjust this based on your logic)
    const tagCounts = Array(7).fill(0); // Assuming you want to show data for 7 days

    // Assuming each tag has a 'createdAt' field with a timestamp
    tags.forEach((tag) => {
      const tagDate = new Date(tag.createdAt);
      const dayOfWeek = tagDate.getDay(); // 0 is Sunday, 6 is Saturday
      tagCounts[dayOfWeek] += 1; // Increment tag count for the respective day
    });

    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Tags',
          data: tagCounts,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [tags, isLoading, isError]);

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

export default TagsChart;

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Filler } from 'chart.js';

// Register the Filler plugin
Chart.register(Filler);

const CategoriesChart = ({ categories }) => {
  // Check if categories is a valid array before attempting to map
  if (!Array.isArray(categories)) {
    return <p>No categories data available</p>; // Fallback message if categories is not an array
  }

  // Assume that each category has a `createdAt` date field or you can simulate the date.
  const categoryCreationData = categories.map((category) => {
    const month = new Date(category.createdAt).getMonth(); // Get month from category's creation date
    return month; // Return the month of creation
  });

  // Create an array with the count of categories created per month
  const categoryCountPerMonth = new Array(12).fill(0); // Initialize an array with 12 months

  categoryCreationData.forEach((month) => {
    categoryCountPerMonth[month]++; // Increment the count for the respective month
  });

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Categories',
        data: categoryCountPerMonth, // Use the real data
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        fill: true, // Enable the fill option
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

export default CategoriesChart;

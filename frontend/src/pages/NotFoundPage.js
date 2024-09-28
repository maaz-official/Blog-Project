import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <div className="mb-6">
        {/* SVG Illustration */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-64 h-64 text-gray-700"
        >
          <path
            d="M256 294.1C284.3 294.1 308 270.4 308 242C308 213.6 284.3 189.9 256 189.9C227.7 189.9 204 213.6 204 242C204 270.4 227.7 294.1 256 294.1Z"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M408 428.2C397.4 353.8 332.4 297.9 256 297.9C179.6 297.9 114.6 353.8 104 428.2"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M180.5 122.4C193.5 110.6 210.8 104 229.4 104C261.7 104 288.9 126.2 293.8 156.7"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M66.3 238.2C69.9 232.3 75.8 226.5 83.5 226.5C91.1 226.5 97 232.3 100.6 238.2"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M110.9 163.7C104.2 157.4 93.5 153 83.4 153C70.4 153 60 164.2 60 177.1C60 190.1 70.4 201.3 83.4 201.3"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M420.6 177.1C420.6 164.2 410.2 153 397.3 153C387.1 153 376.5 157.4 369.8 163.7"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M431.3 238.2C434.9 232.3 440.8 226.5 448.5 226.5C456.1 226.5 462 232.3 465.6 238.2"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M299.7 122.4C312.7 110.6 329.9 104 348.5 104C380.8 104 408 126.2 412.9 156.7"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-lg text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

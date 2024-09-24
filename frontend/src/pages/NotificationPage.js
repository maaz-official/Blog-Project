import React, { useState } from 'react';

const notificationsData = {
  all: [
    { id: 1, message: 'John liked your post', type: 'like', date: '2023-09-21' },
    { id: 2, message: 'Alex commented on your photo', type: 'comment', date: '2023-09-22' },
    { id: 3, message: 'Your post received 10 new likes', type: 'like', date: '2023-09-23' },
  ],
  responses: [
    { id: 1, message: 'Alex replied to your comment', type: 'response', date: '2023-09-22' },
    { id: 2, message: 'Emma responded to your thread', type: 'response', date: '2023-09-23' },
  ],
};

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // Manage active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Change the active tab
  };

  // Determine which notifications to show based on the active tab
  const notificationsToShow = activeTab === 'all' ? notificationsData.all : notificationsData.responses;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>

      {/* Tabs for All and Responses */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 ml-4 focus:outline-none ${
            activeTab === 'responses' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('responses')}
        >
          Responses
        </button>
      </div>

      {/* Notification List */}
      <div>
        {notificationsToShow.length > 0 ? (
          <ul>
            {notificationsToShow.map((notification) => (
              <li
                key={notification.id}
                className="mb-4 p-4 bg-white shadow-md rounded-lg"
              >
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications found</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

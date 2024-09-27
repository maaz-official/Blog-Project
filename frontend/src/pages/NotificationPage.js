import React, { useState } from 'react';

// Updated notificationsData to include user profile pictures
const notificationsData = {
  all: [
    {
      id: 1,
      message: 'John liked your post',
      type: 'like',
      date: '2023-09-21',
      user: {
        name: 'John',
        profilePicture: '/assets/profile/john.jpg', // User profile picture
      },
    },
    {
      id: 2,
      message: 'Alex commented on your photo',
      type: 'comment',
      date: '2023-09-22',
      user: {
        name: 'Alex',
        profilePicture: '/assets/profile/alex.jpg',
      },
    },
    {
      id: 3,
      message: 'Your post received 10 new likes',
      type: 'like',
      date: '2023-09-23',
      user: {
        name: 'Emma',
        profilePicture: '/assets/profile/emma.jpg',
      },
    },
  ],
  responses: [
    {
      id: 1,
      message: 'Alex replied to your comment',
      type: 'response',
      date: '2023-09-22',
      user: {
        name: 'Alex',
        profilePicture: '/assets/profile/alex.jpg',
      },
    },
    {
      id: 2,
      message: 'Emma responded to your thread',
      type: 'response',
      date: '2023-09-23',
      user: {
        name: 'Emma',
        profilePicture: '/assets/profile/emma.jpg',
      },
    },
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
                className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4"
              >
                {/* User profile image */}
                <img
                  src={notification.user.profilePicture}
                  alt={notification.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
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


// Notification Slices

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useGetNotificationsQuery, useMarkNotificationAsReadMutation } from '../slices/userApiSlice'; // Assuming you have this setup
// import { FaBell } from 'react-icons/fa'; // Notification icon
// import { markNotificationRead } from '../slices/notificationSlice'; // Assuming you have this in your Redux slice

// const NotificationPage = () => {
//   const [activeTab, setActiveTab] = useState('all'); // Manage active tab
//   const dispatch = useDispatch();

//   // Fetch notifications from API using Redux
//   const { data: notifications = [], isLoading } = useGetNotificationsQuery();
//   const [markAsRead] = useMarkNotificationAsReadMutation();

//   // Separate notifications by type
//   const allNotifications = notifications.filter((n) => !n.read);
//   const responseNotifications = notifications.filter((n) => n.type === 'response' && !n.read);

//   // Set which notifications to show based on the active tab
//   const notificationsToShow = activeTab === 'all' ? allNotifications : responseNotifications;

//   // Mark notification as read and update the unread count
//   const handleNotificationClick = async (notificationId) => {
//     try {
//       await markAsRead(notificationId).unwrap();
//       dispatch(markNotificationRead(notificationId)); // Update the Redux store
//     } catch (err) {
//       console.error('Failed to mark as read:', err);
//     }
//   };

//   // Handle active tab change
//   const handleTabClick = (tab) => setActiveTab(tab);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Notifications</h1>

//       {/* Tabs for All and Responses */}
//       <div className="flex border-b mb-4">
//         <button
//           className={`px-4 py-2 focus:outline-none ${
//             activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
//           }`}
//           onClick={() => handleTabClick('all')}
//         >
//           All
//         </button>
//         <button
//           className={`px-4 py-2 ml-4 focus:outline-none ${
//             activeTab === 'responses' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
//           }`}
//           onClick={() => handleTabClick('responses')}
//         >
//           Responses
//         </button>
//       </div>

//       {/* Notification List */}
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : notificationsToShow.length > 0 ? (
//         <ul>
//           {notificationsToShow.map((notification) => (
//             <li
//               key={notification.id}
//               className={`mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4 ${
//                 notification.read ? 'bg-gray-200' : 'bg-white'
//               }`} // Change background if read
//               onClick={() => handleNotificationClick(notification.id)} // Mark as read on click
//             >
//               {/* User profile image */}
//               <img
//                 src={notification.user.profilePicture}
//                 alt={notification.user.name}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <p className="text-gray-800">{notification.message}</p>
//                 <p className="text-sm text-gray-500">{notification.date}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No notifications found</p>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;


// NotificationApiSlice

// import { apiSlice } from './apiSlice';

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getNotifications: builder.query({
//       query: () => '/api/notifications', // Replace with actual endpoint
//       providesTags: ['Notifications'],
//     }),
//     markNotificationAsRead: builder.mutation({
//       query: (notificationId) => ({
//         url: `/api/notifications/${notificationId}/read`,
//         method: 'PATCH',
//       }),
//       invalidatesTags: ['Notifications'], // Invalidate cache so it refetches
//     }),
//   }),
// });

// export const { useGetNotificationsQuery, useMarkNotificationAsReadMutation } = userApiSlice;

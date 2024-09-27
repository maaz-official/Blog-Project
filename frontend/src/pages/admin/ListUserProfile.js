// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetUserProfileQuery, useGetUserPostsQuery, useFollowUserMutation, useUnfollowUserMutation, useSoftDeleteUserProfileMutation } from '../features/userApiSlice';

// const UserProfilePage = () => {
//   const { id } = useParams(); // Get user ID from URL parameters
//   const { data: userProfile, isLoading: isLoadingProfile, error: errorProfile } = useGetUserProfileQuery(id);
//   const { data: userPosts, isLoading: isLoadingPosts, error: errorPosts } = useGetUserPostsQuery(id);
//   const [followUser] = useFollowUserMutation();
//   const [unfollowUser] = useUnfollowUserMutation();
//   const [softDeleteUserProfile] = useSoftDeleteUserProfileMutation();

//   // Handle following a user
//   const handleFollow = async () => {
//     try {
//       await followUser(id).unwrap();
//     } catch (err) {
//       console.error('Failed to follow user:', err);
//     }
//   };

//   // Handle unfollowing a user
//   const handleUnfollow = async () => {
//     try {
//       await unfollowUser(id).unwrap();
//     } catch (err) {
//       console.error('Failed to unfollow user:', err);
//     }
//   };

//   // Handle soft deleting a user profile
//   const handleDeleteProfile = async () => {
//     try {
//       await softDeleteUserProfile(id).unwrap();
//     } catch (err) {
//       console.error('Failed to delete user profile:', err);
//     }
//   };

//   if (isLoadingProfile) return <p>Loading user profile...</p>;
//   if (errorProfile) return <p>Error loading user profile</p>;

//   if (isLoadingPosts) return <p>Loading user posts...</p>;
//   if (errorPosts) return <p>Error loading user posts</p>;

//   return (
//     <div>
//       <h1>{userProfile?.name}'s Profile</h1>
//       <p>Email: {userProfile?.email}</p>
//       <p>Joined: {userProfile?.joinedDate}</p>
//       <button onClick={handleFollow}>Follow</button>
//       <button onClick={handleUnfollow}>Unfollow</button>
//       <button onClick={handleDeleteProfile}>Delete Profile</button>

//       <h2>{userProfile?.name}'s Posts</h2>
//       <ul>
//         {userPosts?.map(post => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserProfilePage;


// import { apiSlice } from './apiSlices'; // Import the base API slice
// import { USERS_URL } from '../constant'; // URL for the users API endpoint

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Fetch user profile details by ID
//     getUserProfile: builder.query({
//       query: (userId) => ({
//         url: `${USERS_URL}/${userId}`,
//         method: 'GET',
//       }),
//       keepUnusedDataFor: 5,
//     }),

//     // Fetch all posts by a user
//     getUserPosts: builder.query({
//       query: (userId) => ({
//         url: `${USERS_URL}/${userId}/posts`,
//         method: 'GET',
//       }),
//       keepUnusedDataFor: 5,
//     }),

//     // Follow a user
//     followUser: builder.mutation({
//       query: (userId) => ({
//         url: `${USERS_URL}/follow`,
//         method: 'POST',
//         body: { userId },
//       }),
//     }),

//     // Unfollow a user
//     unfollowUser: builder.mutation({
//       query: (userId) => ({
//         url: `${USERS_URL}/unfollow`,
//         method: 'POST',
//         body: { userId },
//       }),
//     }),

//     // Soft delete a user profile
//     softDeleteUserProfile: builder.mutation({
//       query: (userId) => ({
//         url: `${USERS_URL}/${userId}/profile`,
//         method: 'DELETE',
//       }),
//     }),
//   }),
// });

// export const {
//   useGetUserProfileQuery, // Hook to fetch user profile details
//   useGetUserPostsQuery, // Hook to fetch posts by a user
//   useFollowUserMutation, // Hook to follow a user
//   useUnfollowUserMutation, // Hook to unfollow a user
//   useSoftDeleteUserProfileMutation, // Hook to soft delete user profile
// } = userApiSlice;

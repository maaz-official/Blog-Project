import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserProfileQuery, useGetUserPostsQuery, useFollowUserMutation, useUnfollowUserMutation, useSoftDeleteUserProfileMutation } from '../features/userApiSlice';

const UserProfilePage = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const { data: userProfile, isLoading: isLoadingProfile, error: errorProfile } = useGetUserProfileQuery(id);
  const { data: userPosts, isLoading: isLoadingPosts, error: errorPosts } = useGetUserPostsQuery(id);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [softDeleteUserProfile] = useSoftDeleteUserProfileMutation();

  // Handle following a user
  const handleFollow = async () => {
    try {
      await followUser(id).unwrap();
    } catch (err) {
      console.error('Failed to follow user:', err);
    }
  };

  // Handle unfollowing a user
  const handleUnfollow = async () => {
    try {
      await unfollowUser(id).unwrap();
    } catch (err) {
      console.error('Failed to unfollow user:', err);
    }
  };

  // Handle soft deleting a user profile
  const handleDeleteProfile = async () => {
    try {
      await softDeleteUserProfile(id).unwrap();
    } catch (err) {
      console.error('Failed to delete user profile:', err);
    }
  };

  if (isLoadingProfile) return <p>Loading user profile...</p>;
  if (errorProfile) return <p>Error loading user profile</p>;

  if (isLoadingPosts) return <p>Loading user posts...</p>;
  if (errorPosts) return <p>Error loading user posts</p>;

  return (
    <div>
      <h1>{userProfile?.name}'s Profile</h1>
      <p>Email: {userProfile?.email}</p>
      <p>Joined: {userProfile?.joinedDate}</p>
      <button onClick={handleFollow}>Follow</button>
      <button onClick={handleUnfollow}>Unfollow</button>
      <button onClick={handleDeleteProfile}>Delete Profile</button>

      <h2>{userProfile?.name}'s Posts</h2>
      <ul>
        {userPosts?.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfilePage;



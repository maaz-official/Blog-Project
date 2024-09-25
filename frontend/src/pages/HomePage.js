import React from 'react';
import { useGetPostsQuery } from '../slices/postApiSlice'; // Import the API hook
import Post from '../components/Post'; // Import the Post component
import Sidebar from '../components/PostSidebar'; // Import the Sidebar component
import Loader from '../components/Loader';
import Message from '../components/Message';

function HomePage() {
  // Use the hook to fetch posts
  const { data: posts, isLoading, isError, error } = useGetPostsQuery();

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side for posts (2/3 of the width on large screens) */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">HomePage</h1>

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Error State */}
        {isError && <Message variant="danger">{error.message}</Message>}

        {/* Render posts when data is available */}
        {posts && posts.map((post, index) => (
          <Post key={post.id || index} post={post} />
        ))}
      </div>

      {/* Right side for the sidebar (1/3 of the width on large screens) */}
      <div className="hidden lg:block"> {/* Sidebar will only be visible on large screens */}
        <Sidebar />
      </div>
    </div>
  );
}

export default HomePage;

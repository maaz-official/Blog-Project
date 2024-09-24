import React from 'react';
import postdata from '../post'; // Adjust the path if needed
import Post from '../components/Post'; // Import the Post component
import Sidebar from '../components/PostSidebar'; // Import the Sidebar component

function HomePage() {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side for posts (2/3 of the width on large screens) */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">HomePage</h1>
        {/* Mapping over the posts array to render each Post component */}
        {postdata.map((post) => (
          <Post key={post.id} post={post} />
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

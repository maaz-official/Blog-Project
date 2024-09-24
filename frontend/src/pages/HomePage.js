import React from 'react';
import postdata from '../post'; // Adjust the path if needed
import Post from '../components/Post';

function HomePage() {
  return (
    <div className="homepage">
      <h1>HomePage</h1>
      {/* Mapping over the posts array to render each Post component */}
      {postdata.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default HomePage;

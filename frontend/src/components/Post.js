import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const postId = post.id || post._id; // Use id or _id

  const [visibleComments, setVisibleComments] = useState(2); // Initially show 2 comments
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility
  const [commentText, setCommentText] = useState(''); // State for comment input

  const handleShowMore = () => {
    setVisibleComments((prevCount) => prevCount + 2); // Load 2 more comments each time
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === '') return; // Do not allow empty comments

    // Handle the comment submission logic (backend integration can go here)
    console.log('Comment submitted: ', commentText);
    setCommentText(''); // Reset the comment input
  };

  const { title, coverImage, category, author, content, createdAt, tags, likes, shares, comments } = post;

  return (
    <div className="relative">
      {/* Container for all posts (apply blur if sidebar is open) */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'blur-sm' : ''}`}>
        <div className="post bg-white rounded-lg p-4 mb-6 max-w-4xl mx-auto relative">
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Left: Post Content */}
            <div className="lg:w-1/2 pr-2">
              {/* Post Title - Linked to product details page */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                <Link to={`/post/${postId}`} className="hover:underline">
                  {title}
                </Link>
              </h1>

              {/* Post Metadata: Author, Date */}
              <div className="post-meta flex items-center mb-2">
                <img
                  src={author.profilePicture}
                  alt={author.name}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                />
                <div className="ml-2">
                  <span className="block font-semibold text-gray-800">{author.name}</span>
                  <span className="text-gray-500 text-sm">{new Date(createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="post-content text-md text-gray-700 leading-relaxed mb-2">
                <p>{content}</p>
              </div>

              {/* Post Tags */}
              {tags && tags.length > 0 && (
                <div className="post-tags mb-2">
                  <strong className="font-semibold text-gray-700 mb-1 block">Tags:</strong>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Post Engagement: Likes, Comments, Shares */}
              <div className="post-engagement flex space-x-4 items-center">
                <span className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 10.5a7.5 7.5 0 1115 0c0 2.738-1.8 5.513-5 7.42a2.25 2.25 0 01-2.5 0C4.8 16.013 3 13.238 3 10.5zM10 13a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                  {likes} Likes
                </span>
                <span className="flex items-center text-gray-600 cursor-pointer" onClick={toggleSidebar}>
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10.5a8 8 0 1016 0 8 8 0 10-16 0zm3.2-1.293A4.5 4.5 0 1110 13h5a1.5 1.5 0 010 3H5.5A1.5 1.5 0 014 14.5V8a1.5 1.5 0 011.2-1.293z" />
                  </svg>
                  <span>{comments.length}</span>
                </span>
                <span className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.707 4.293a1 1 0 00-1.414 0L10 10.586 3.707 4.293a1 1 0 00-1.414 1.414l7 7a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
                  </svg>
                  {shares} Shares
                </span>
              </div>
            </div>

            {/* Right: Post Cover Image */}
            <div className="lg:w-1/2 lg:pl-2">
              {coverImage && (
                <div className="relative mb-4">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  {category && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {category}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for Comments and Comment Input */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 z-50 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Responses ({comments.length})</h3>
              <button
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Comment Input Section */}
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="What are your thoughts?"
                value={commentText}
                onChange={handleCommentChange}
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Respond
              </button>
            </form>

            {/* Existing Comments */}
            <div className="flex-1 overflow-y-auto">
              {comments.slice(0, visibleComments).map((comment, index) => (
                <div key={index} className="comment bg-gray-50 p-4 rounded-lg mb-4">
                  {/* Comment Author */}
                  <div className="flex items-center mb-3">
                    <img
                      src={comment.author.profilePicture}
                      alt={comment.author.name}
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                    <div className="ml-2">
                      <span className="block font-semibold text-gray-800">{comment.author.name}</span>
                      <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {/* Comment Text */}
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
              {visibleComments < comments.length && (
                <button
                  onClick={handleShowMore}
                  className="text-blue-500 hover:underline"
                >
                  Show More Comments
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

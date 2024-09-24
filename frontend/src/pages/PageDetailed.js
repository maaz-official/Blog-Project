import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import posts from '../post'; // Assuming you have posts data available

const PostDetailed = ({ loggedInUser }) => {
  const { id } = useParams(); // Extract post ID from URL params
  const post = posts.find((p) => p.id === id); // Find the post by ID

  // Declare hooks outside of any condition
  const [visibleComments, setVisibleComments] = useState(2); // Initially show 2 comments
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility
  const [commentText, setCommentText] = useState(''); // State for comment input

  if (!post) {
    return <div>Post not found</div>; // Return this if the post is not found
  }

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
    console.log('Comment submitted: ', commentText);
    setCommentText(''); // Reset the comment input
  };

  // Fallback for loggedInUser if not provided
  const defaultUser = {
    profilePicture: '/assets/profile/default-profile.png',
    name: 'Guest',
  };
  const user = loggedInUser || defaultUser;

  return (
    <div className="relative">
      {/* Container for post details */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'blur-sm' : ''}`}>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto relative">
          {/* Post Cover Image */}
          {post.coverImage && (
            <div className="mb-6">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Post Title */}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {/* Post Metadata: Author, Date */}
          <div className="flex items-center mb-6">
            <img
              src={post.author.profilePicture}
              alt={post.author.name}
              className="w-14 h-14 rounded-full border-2 border-gray-300"
            />
            <div className="ml-4">
              <span className="block font-semibold text-lg text-gray-800">{post.author.name}</span>
              <span className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-lg text-gray-700 leading-relaxed mb-6">
            <p>{post.content}</p>
          </div>

          {/* Post Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6">
              <strong className="font-semibold text-gray-700 mb-2 block">Tags:</strong>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Post Engagement: Likes, Comments, Shares */}
          <div className="flex space-x-6 items-center mb-8">
            <span className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 10.5a7.5 7.5 0 1115 0c0 2.738-1.8 5.513-5 7.42a2.25 2.25 0 01-2.5 0C4.8 16.013 3 13.238 3 10.5zM10 13a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              {post.likes} Likes
            </span>
            <span className="flex items-center text-gray-600 cursor-pointer" onClick={toggleSidebar}>
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a8 8 0 1016 0 8 8 0 10-16 0zm3.2-1.293A4.5 4.5 0 1110 13h5a1.5 1.5 0 010 3H5.5A1.5 1.5 0 014 14.5V8a1.5 1.5 0 011.2-1.293z" />
              </svg>
              <span>{post.comments.length} Comments</span>
            </span>
            <span className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.707 4.293a1 1 0 00-1.414 0L10 10.586 3.707 4.293a1 1 0 00-1.414 1.414l7 7a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
              </svg>
              {post.shares} Shares
            </span>
          </div>

          {/* Comment Input Section */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex items-center mb-2">
              <img src={user.profilePicture} alt={user.name} className="w-10 h-10 rounded-full" />
              <span className="ml-4 text-gray-800 font-semibold">{user.name}</span>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="What are your thoughts?"
              value={commentText}
              onChange={handleCommentChange}
            ></textarea>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button type="button" className="text-xl font-bold">
                  B
                </button>
                <button type="button" className="text-xl italic">
                  i
                </button>
              </div>
              <button type="submit" className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition">
                Respond
              </button>
            </div>
          </form>

          {/* Existing Comments */}
          {post.comments.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xl font-semibold mb-4">Comments</h3>
              {post.comments.slice(0, visibleComments).map((comment) => (
                <div key={comment.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.author.profilePicture}
                      alt={comment.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <span className="block font-semibold">{comment.author.name}</span>
                      <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">{comment.content}</p>
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-10 border-l-2 pl-4 border-gray-300">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="mb-2">
                          <div className="flex items-center mb-1">
                            <img src={reply.author.profilePicture} alt={reply.author.name} className="w-8 h-8 rounded-full" />
                            <span className="ml-2 font-semibold">{reply.author.name}</span>
                          </div>
                          <p className="text-gray-600">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {visibleComments < post.comments.length && (
                <button onClick={handleShowMore} className="text-blue-500 hover:underline">
                  Show More Comments
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for Comments */}
      <div
        className={`fixed top-0 right-0 z-50 w-96 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Responses ({post.comments.length})</h3>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-3">
                  <img
                    src={comment.author.profilePicture}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                  />
                  <div className="ml-4">
                    <span className="block font-semibold text-gray-700">{comment.author.name}</span>
                    <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.content}</p>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-6 border-l-2 border-gray-200">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply mb-2">
                        <div className="flex items-center mb-1">
                          <img src={reply.author.profilePicture} alt={reply.author.name} className="w-8 h-8 rounded-full border-2 border-gray-300" />
                          <span className="ml-2 font-semibold text-gray-700">{reply.author.name}</span>
                        </div>
                        <p className="text-gray-600">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background overlay when the sidebar is open */}
      {isSidebarOpen && <div className="fixed inset-0 opacity-50 bg-gray-800 z-40" onClick={toggleSidebar} />}
    </div>
  );
};

export default PostDetailed;
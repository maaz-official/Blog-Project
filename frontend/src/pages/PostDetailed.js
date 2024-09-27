import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../slices/postApiSlice'; // Import the API hook
import Loader from '../components/Loader'; // Assuming you have a Loader component
import Message from '../components/Message'; // Assuming you have a Message component for errors

const PostDetailed = () => {
  const { id } = useParams(); // Extract post ID from URL params
  const { data: post, isLoading, isError, error } = useGetPostByIdQuery(id); // Fetch post details by ID

  const [visibleComments, setVisibleComments] = useState(2); // Initially show 2 comments
  const [commentText, setCommentText] = useState(''); // State for comment input

  // Handle loader while data is being fetched
  if (isLoading) {
    return <Loader />; // Show a loader when the data is being fetched
  }

  // Handle error scenarios
  if (isError) {
    return <Message variant="danger">{error?.data?.message || 'Error fetching post details'}</Message>; // Show error message
  }

  // Handle case where post is not found
  if (!post) {
    return <Message variant="danger">Post not found</Message>;
  }

  const handleShowMore = () => {
    setVisibleComments((prevCount) => prevCount + 2); // Load 2 more comments each time
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

  return (
    <div className="relative bg-white p-6 mb-8 mt-8 max-w-4xl mx-auto">
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

      {/* Post Metadata: Author, Date, Read Time */}
      <div className="flex items-center mb-6">
        <img
          src={post.author.profilePicture}
          alt={post.author.name}
          className="w-14 h-14 rounded-full border-2 border-gray-300"
        />
        <div className="ml-4">
          <span className="block font-semibold text-lg text-gray-800">{post.author.name}</span>
          <span className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()} · {post.readTime}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="text-lg text-gray-700 leading-relaxed mb-6">
        <p>{post.content}</p>
      </div>

      {/* Conclusion */}
      {post.conclusion && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Conclusion</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{post.conclusion}</p>
        </div>
      )}

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
        <span className="flex items-center text-gray-600 cursor-pointer">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a8 8 0 1016 0 8 8 0 10-16 0zm3.2-1.293A4.5 4.5 0 1110 13h5a1.5 1.5 0 010 3H5.5A1.5 1.5 0 014 14.5V8a1.5 1.5 0 011.2-1.293z" />
          </svg>
          <span>{post.comments?.length || 0} Comments</span>
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
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 mb-2"
          placeholder="What are your thoughts?"
          value={commentText}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Respond
          </button>
        </div>
      </form>

      {/* Existing Comments */}
      {post.comments && post.comments.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {post.comments.slice(0, visibleComments).map((comment) => (
            <div key={comment.id || comment._id} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={comment.author.profilePicture}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <span className="block font-semibold">{comment.author.name}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2">{comment.content}</p>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-10 border-l-2 pl-4 border-gray-300">
                  {comment.replies.map((reply) => (
                    <div key={reply.id || reply._id} className="mb-2">
                      <div className="flex items-center mb-1">
                        <img
                          src={reply.author.profilePicture}
                          alt={reply.author.name}
                          className="w-8 h-8 rounded-full"
                        />
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
  );
};

export default PostDetailed;

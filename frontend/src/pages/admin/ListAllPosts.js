import React from 'react';
import { useGetPostsQuery, useDeletePostMutation } from '../../slices/postApiSlice';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const ListAllPosts = () => {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id).unwrap();
        toast.success('Post deleted successfully');
      } catch (err) {
        toast.error('Failed to delete post');
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Failed to load posts</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-t">
                <td className="px-4 py-2">{post.title}</td>
                
                {/* Fix: Access author name properly */}
                <td className="px-4 py-2">{post.author && post.author.name}</td>
                
                <td className="px-4 py-2">{post.category}</td>
                <td className="px-4 py-2 flex space-x-4">
                  <Link to={`/posts/edit/${post._id}`} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListAllPosts;

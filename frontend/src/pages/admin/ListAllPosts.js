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
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
        <h1 className="text-xl font-bold">Posts Table</h1>
      </div>

      {/* Posts Table */}
      {posts.length === 0 ? (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <p>No posts available.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 text-sm font-medium uppercase">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={post._id} className={`border-t ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  {/* Post Title */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img src="https://via.placeholder.com/40" alt="Post Thumbnail" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-gray-900">{post.title}</p>
                      </div>
                    </div>
                  </td>

                  {/* Author Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-semibold text-gray-900">{post.author?.name || 'Unknown Author'}</p>
                        <p className="text-sm text-gray-500">{post.author?.email || 'No Email Available'}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-600">{post.category}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <Link to={`/posts/edit/${post._id}`} className="text-blue-500 hover:text-blue-700">
                        <FaEdit className="w-5 h-5" />
                      </Link>
                      <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListAllPosts;

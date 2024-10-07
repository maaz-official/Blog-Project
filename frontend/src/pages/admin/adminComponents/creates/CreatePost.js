import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../../../../slices/postApiSlice';
import { useGetCategoriesQuery } from '../../../../slices/categoryApiSlice'; // Fetch categories
import { useGetTagsQuery } from '../../../../slices/tagApiSlice'; // Fetch tags
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery(); // Get categories
  const { data: tags = [], isLoading: tagsLoading } = useGetTagsQuery(); // Get tags

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    coverImage: '',
    category: '', // Single category
    tags: [], // Multiple tags
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
    setFormData((prevData) => ({
      ...prevData,
      tags: selectedTags,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        ...formData,
        likes: 0,
        shares: 0,
        views: 0,
        readTime: 0,
        comments: [],
      };
      await createPost(postData).unwrap();
      alert('Post created successfully!');
      navigate('/posts');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Content:</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            theme="snow"
            placeholder="Write your post content here..."
            className="w-full h-64"
            required
          />
        </div>

        {/* Cover Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL:</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {!categoriesLoading && categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Multi-select */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags:</label>
          <select
            name="tags"
            value={formData.tags}
            onChange={handleTagsChange}
            multiple
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {!tagsLoading && tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;

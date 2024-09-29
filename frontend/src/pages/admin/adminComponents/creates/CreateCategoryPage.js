import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCategoryMutation } from '../../../../slices/categoryApiSlice'; // Assuming this is set up
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout'; // Import the AdminLayout

const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  // State to track the form inputs
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(categoryData).unwrap();
      toast.success('Category created successfully');
      navigate('/admin/categories'); // Redirect to category list page after creation
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Create New Category</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={categoryData.name}
              onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Category Description
            </label>
            <textarea
              id="description"
              value={categoryData.description}
              onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : 'Create Category'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/categories')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateCategoryPage;

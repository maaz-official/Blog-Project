import React, { useState } from 'react';
import { useCreateCategoryMutation } from '../../../../slices/categoryApiSlice';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';

const CreateCategoryPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isArchived, setIsArchived] = useState(false);  // Add state for archive status
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory({ name, description, isArchived }).unwrap();
      toast.success('Category created successfully');
      setName('');  // Reset form
      setDescription('');
      setIsArchived(false);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isArchived">
              Archive Category?
            </label>
            <input
              type="checkbox"
              id="isArchived"
              checked={isArchived}
              onChange={(e) => setIsArchived(e.target.checked)}  // Toggle archive status
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateCategoryPage;

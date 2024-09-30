import React, { useState } from 'react';
import { useCreateTagMutation } from '../../../../slices/tagApiSlice'; // Import from tagApiSlice
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';

const CreateTagPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createTag, { isLoading }] = useCreateTagMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTag({ name, description }).unwrap();
      toast.success('Tag created successfully');
      setName('');  // Reset form
      setDescription('');
    } catch (err) {
      toast.error('Failed to create tag');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Create New Tag</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Tag Name
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
              Tag Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Tag'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateTagPage;

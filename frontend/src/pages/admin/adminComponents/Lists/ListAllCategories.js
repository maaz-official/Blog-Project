import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../../../slices/categoryApiSlice'; // Assuming categoryApiSlice is already set up
import { FaTrash, FaEdit } from 'react-icons/fa';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout'; // Import the AdminLayout

const ListAllCategories = () => {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate(); // Hook to navigate to the edit page

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
        toast.success('Category deleted successfully');
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`); // Navigate to the edit page
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Failed to load categories</p>;
  }

  return (
    <AdminLayout> {/* Wrap content with the AdminLayout */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Categories Table</h1>
        </div>

        {/* Categories Table */}
        {categories.length === 0 ? (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p>No categories available.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 text-sm font-medium uppercase">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, idx) => (
                  <tr key={category._id} className={`border-t ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    {/* Category Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-semibold text-gray-900">{category.name}</p>
                    </td>

                    {/* Category Description */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-600">{category.description}</p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEdit(category._id)}  // Navigate to edit page
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-500 hover:text-red-700"
                        >
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
    </AdminLayout>
  );
};

export default ListAllCategories;

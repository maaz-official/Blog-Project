import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../../../slices/categoryApiSlice';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';
import PermissionAsk from '../../../../components/PermissionAsk'; // Import PermissionAsk component

const ListAllCategories = () => {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery(); // Fetch categories

  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();
  const [showPermissionAsk, setShowPermissionAsk] = useState(false); // State to control PermissionAsk modal visibility
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Store category ID for deletion

  const handleDeleteClick = (id) => {
    setSelectedCategoryId(id); // Set the selected category ID
    setShowPermissionAsk(true); // Show the permission modal
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory(selectedCategoryId).unwrap();
      toast.success('Category deleted successfully');
    } catch (err) {
      toast.error('Failed to delete category');
    } finally {
      setShowPermissionAsk(false); // Hide the modal after deletion
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Failed to load categories</p>;
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>No categories found</p>;
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Categories Table</h1>
        </div>

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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">{category.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-600">{category.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleEdit(category._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category._id)} // Call handleDeleteClick to ask for permission
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

        {/* Render PermissionAsk modal conditionally */}
        {showPermissionAsk && (
          <PermissionAsk
            onConfirm={handleDeleteConfirm} // Confirm deletion
            onCancel={() => setShowPermissionAsk(false)} // Cancel deletion
            message="Are you sure you want to delete this category?"
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ListAllCategories;

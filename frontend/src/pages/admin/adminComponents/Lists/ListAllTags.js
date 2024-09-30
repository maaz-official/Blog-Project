import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTagsQuery, useDeleteTagMutation } from '../../../../slices/tagApiSlice'; // Import from tagApiSlice
import { FaTrash, FaEdit } from 'react-icons/fa';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';
import PermissionAsk from '../../../../components/PermissionAsk'; // Import PermissionAsk component

const ListAllTags = () => {
  const { data: tags = [], isLoading, isError } = useGetTagsQuery(); // Fetch tags

  const [deleteTag] = useDeleteTagMutation();
  const navigate = useNavigate();
  const [showPermissionAsk, setShowPermissionAsk] = useState(false); // State to control PermissionAsk modal visibility
  const [selectedTagId, setSelectedTagId] = useState(null); // Store tag ID for deletion

  const handleDeleteClick = (id) => {
    setSelectedTagId(id); // Set the selected tag ID
    setShowPermissionAsk(true); // Show the permission modal
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTag(selectedTagId).unwrap();
      toast.success('Tag deleted successfully');
    } catch (err) {
      toast.error('Failed to delete tag');
    } finally {
      setShowPermissionAsk(false); // Hide the modal after deletion
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/tags/edit/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Failed to load tags</p>;
  }

  if (!Array.isArray(tags) || tags.length === 0) {
    return <p>No tags found</p>;
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Tags Table</h1>
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
              {tags.map((tag, idx) => (
                <tr key={tag._id} className={`border-t ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">{tag.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-600">{tag.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleEdit(tag._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(tag._id)} // Call handleDeleteClick to ask for permission
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
            message="Are you sure you want to delete this tag?"
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ListAllTags;

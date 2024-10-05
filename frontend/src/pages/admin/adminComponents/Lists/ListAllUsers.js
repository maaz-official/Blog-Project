import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery, useDeleteUserMutation } from '../../../../slices/userApiSlice';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';
import PermissionAsk from '../../../../components/PermissionAsk'; // Import PermissionAsk component

const ListAllUsers = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery(); // Fetch users

  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  const [showPermissionAsk, setShowPermissionAsk] = useState(false); // State to control PermissionAsk modal visibility
  const [selectedUserId, setSelectedUserId] = useState(null); // Store user ID for deletion

  const handleDeleteClick = (id) => {
    setSelectedUserId(id); // Set the selected user ID
    setShowPermissionAsk(true); // Show the permission modal
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    } finally {
      setShowPermissionAsk(false); // Hide the modal after deletion
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Failed to load users</p>;
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Users Table</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 text-sm font-medium uppercase">
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role(s)</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className={`border-t ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">{user.fullName}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-600">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-600">
                      {user.roles.map((role, index) => (
                        <span key={index} className="mr-2">
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                      ))}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user._id)} // Call handleDeleteClick to ask for permission
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
            message="Are you sure you want to delete this user?"
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ListAllUsers;

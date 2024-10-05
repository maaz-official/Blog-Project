import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../../../slices/userApiSlice';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';
import PermissionAsk from '../../../../components/PermissionAsk';

const UsersEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [showPermissionAsk, setShowPermissionAsk] = useState(false);
  const [actionType, setActionType] = useState('');

  // Define available roles
  const roles = ['Admin', 'Editor', 'Viewer'];

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActionType('update');
    setShowPermissionAsk(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateUser({ id, data: userData }).unwrap();
      toast.success('User updated successfully');
      setShowPermissionAsk(false);
      await refetch(); // Refetch the updated user data
      navigate('/admin/users');
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.data?.message || 'Failed to update user');
    }
  };

  const handleConfirm = () => {
    if (actionType === 'update') {
      handleConfirmUpdate();
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load user</p>;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Edit User</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            >
              <option value="" disabled>Select a role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update User'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>

        {showPermissionAsk && (
          <PermissionAsk
            onConfirm={handleConfirm}
            onCancel={() => setShowPermissionAsk(false)}
            message={`Are you sure you want to update the user ${userData.name}?`}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersEditPage;

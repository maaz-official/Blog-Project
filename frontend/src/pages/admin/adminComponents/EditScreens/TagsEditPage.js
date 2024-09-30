import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTagByIdQuery, useUpdateTagMutation, useToggleArchiveTagMutation } from '../../../../slices/tagApiSlice'; 
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';
import PermissionAsk from '../../../../components/PermissionAsk';

const TagsEditPage = () => {
  const { id } = useParams(); // Get the tag ID from the URL
  const navigate = useNavigate();

  const { data: tag, isLoading, isError } = useGetTagByIdQuery(id);
  const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation();
  const [toggleArchiveTag] = useToggleArchiveTagMutation();

  const [tagData, setTagData] = useState({
    name: '',
    description: '',
  });

  const [showPermissionAsk, setShowPermissionAsk] = useState(false); // State to show the PermissionAsk modal
  const [actionType, setActionType] = useState(''); // State to track which action to confirm

  useEffect(() => {
    if (tag) {
      setTagData({
        name: tag.name,
        description: tag.description,
      });
    }
  }, [tag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionType('update');
    setShowPermissionAsk(true); // Show the permission ask modal before updating
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateTag({ id, data: tagData }).unwrap();
      toast.success('Tag updated successfully');
      setShowPermissionAsk(false);
      navigate('/admin/tags'); // Redirect to tags list
    } catch (err) {
      toast.error('Failed to update tag');
    }
  };

  const handleArchiveToggle = () => {
    setActionType('archive');
    setShowPermissionAsk(true); // Show the permission ask modal before archiving/unarchiving
  };

  const handleConfirmArchiveToggle = async () => {
    try {
      await toggleArchiveTag(id).unwrap();
      toast.success(`Tag ${tag.isArchived ? 'unarchived' : 'archived'} successfully`);
      setShowPermissionAsk(false);
    } catch (err) {
      toast.error('Failed to toggle archive status');
    }
  };

  const handleConfirm = () => {
    if (actionType === 'update') {
      handleConfirmUpdate();
    } else if (actionType === 'archive') {
      handleConfirmArchiveToggle();
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load tag</p>;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-xl font-bold">Edit Tag</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Tag Name
            </label>
            <input
              type="text"
              id="name"
              value={tagData.name}
              onChange={(e) => setTagData({ ...tagData, name: e.target.value })}
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
              value={tagData.description}
              onChange={(e) => setTagData({ ...tagData, description: e.target.value })}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Tag'}
            </button>

            <button
              type="button"
              onClick={handleArchiveToggle}
              className={`bg-${tag?.isArchived ? 'green' : 'yellow'}-500 hover:bg-${tag?.isArchived ? 'green' : 'yellow'}-700 text-white font-bold py-2 px-4 rounded`}
            >
              {tag?.isArchived ? 'Unarchive' : 'Archive'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/tags')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Render PermissionAsk modal conditionally */}
        {showPermissionAsk && (
          <PermissionAsk
            onConfirm={handleConfirm}
            onCancel={() => setShowPermissionAsk(false)}
            message={`Are you sure you want to ${actionType === 'archive' ? (tag?.isArchived ? 'unarchive' : 'archive') : 'update'} this tag?`}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default TagsEditPage;

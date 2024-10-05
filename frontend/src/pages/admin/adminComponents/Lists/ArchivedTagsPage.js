import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTagsQuery, useToggleArchiveTagMutation } from '../../../../slices/tagApiSlice'; // Ensure you have a corresponding tag API slice
import { FaArchive, FaEdit } from 'react-icons/fa';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../../layout/AdminLayout';

const ArchivedTagsPage = () => {
  const { data: tags = [], isLoading, isError } = useGetTagsQuery({ archived: true });
  const [toggleArchiveTag] = useToggleArchiveTagMutation();
  const navigate = useNavigate();

  const handleUnarchive = async (id) => {
    try {
      await toggleArchiveTag(id).unwrap();
      toast.success('Tag unarchived successfully');
    } catch (err) {
      toast.error('Failed to unarchive tag');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/tags/edit/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Failed to load archived tags</p>;
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-900 text-white p-4 rounded-t-lg shadow-md flex justify-between">
          <h1 className="text-xl font-bold">Archived Tags</h1>
          <button
            onClick={() => navigate('/admin/tags')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Tags
          </button>
        </div>

        {tags.length === 0 ? (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p>No archived tags available.</p>
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
                          <FaEdit className="w-5 h-5" /> Edit
                        </button>
                        <button
                          onClick={() => handleUnarchive(tag._id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <FaArchive className="w-5 h-5" /> Unarchive
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

export default ArchivedTagsPage;
// import React, { useState } from 'react';
// import { useGetTagsQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation } from '../features/tagApiSlice';

// const TagsPage = () => {
//   const { data: tags, isLoading, error } = useGetTagsQuery();
//   const [createTag] = useCreateTagMutation();
//   const [updateTag] = useUpdateTagMutation();
//   const [deleteTag] = useDeleteTagMutation();

//   // State for handling form inputs
//   const [newTag, setNewTag] = useState('');
//   const [editTagId, setEditTagId] = useState(null);
//   const [editTagName, setEditTagName] = useState('');

//   // Handler for adding new tag
//   const handleCreateTag = async (e) => {
//     e.preventDefault();
//     if (newTag.trim()) {
//       try {
//         await createTag({ name: newTag }).unwrap();
//         setNewTag(''); // Clear input after adding
//       } catch (err) {
//         console.error('Failed to create tag: ', err);
//       }
//     }
//   };

//   // Handler for updating an existing tag
//   const handleUpdateTag = async (e) => {
//     e.preventDefault();
//     if (editTagName.trim()) {
//       try {
//         await updateTag({ id: editTagId, name: editTagName }).unwrap();
//         setEditTagId(null); // Clear edit state
//         setEditTagName('');
//       } catch (err) {
//         console.error('Failed to update tag: ', err);
//       }
//     }
//   };

//   // Handler for deleting a tag
//   const handleDeleteTag = async (id) => {
//     try {
//       await deleteTag(id).unwrap();
//     } catch (err) {
//       console.error('Failed to delete tag: ', err);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading tags</p>;

//   return (
//     <div>
//       <h1>Tags</h1>

//       {/* Form for creating a new tag */}
//       <form onSubmit={handleCreateTag}>
//         <input
//           type="text"
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           placeholder="Add new tag"
//         />
//         <button type="submit">Create Tag</button>
//       </form>

//       {/* List of tags */}
//       <ul>
//         {tags?.map((tag) => (
//           <li key={tag.id}>
//             {editTagId === tag.id ? (
//               <form onSubmit={handleUpdateTag}>
//                 <input
//                   type="text"
//                   value={editTagName}
//                   onChange={(e) => setEditTagName(e.target.value)}
//                   placeholder="Edit tag name"
//                 />
//                 <button type="submit">Update</button>
//                 <button onClick={() => setEditTagId(null)}>Cancel</button>
//               </form>
//             ) : (
//               <>
//                 {tag.name}
//                 <button onClick={() => {
//                   setEditTagId(tag.id);
//                   setEditTagName(tag.name);
//                 }}>Edit</button>
//                 <button onClick={() => handleDeleteTag(tag.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TagsPage;


// import { apiSlice } from './apiSlices'; // Import the base API slice
// import { TAGS_URL } from '../constant'; // URL for the tags API endpoint

// export const tagApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Fetch all tags
//     getTags: builder.query({
//       query: () => ({
//         url: TAGS_URL,
//         method: 'GET',
//       }),
//       keepUnusedDataFor: 5, // Keep the fetched data for 5 seconds
//     }),

//     // Create a new tag
//     createTag: builder.mutation({
//       query: (newTag) => ({
//         url: TAGS_URL,
//         method: 'POST',
//         body: newTag,
//       }),
//     }),

//     // Update an existing tag by ID
//     updateTag: builder.mutation({
//       query: ({ id, ...updatedTag }) => ({
//         url: `${TAGS_URL}/${id}`,
//         method: 'PUT',
//         body: updatedTag,
//       }),
//     }),

//     // Delete a tag by ID
//     deleteTag: builder.mutation({
//       query: (id) => ({
//         url: `${TAGS_URL}/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//   }),
// });

// export const {
//   useGetTagsQuery, // Hook to fetch all tags
//   useCreateTagMutation, // Hook to create a tag
//   useUpdateTagMutation, // Hook to update a tag
//   useDeleteTagMutation, // Hook to delete a tag
// } = tagApiSlice;

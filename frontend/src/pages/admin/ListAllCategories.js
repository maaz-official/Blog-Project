// import React, { useState } from 'react';
// import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../features/categoryApiSlice';

// const CategoriesPage = () => {
//   const { data: categories, isLoading, error } = useGetCategoriesQuery();
//   const [createCategory] = useCreateCategoryMutation();
//   const [updateCategory] = useUpdateCategoryMutation();
//   const [deleteCategory] = useDeleteCategoryMutation();

//   // State for handling form inputs
//   const [newCategory, setNewCategory] = useState('');
//   const [editCategoryId, setEditCategoryId] = useState(null);
//   const [editCategoryName, setEditCategoryName] = useState('');

//   // Handler for adding new category
//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     if (newCategory.trim()) {
//       try {
//         await createCategory({ name: newCategory }).unwrap();
//         setNewCategory(''); // Clear input after adding
//       } catch (err) {
//         console.error('Failed to create category: ', err);
//       }
//     }
//   };

//   // Handler for updating an existing category
//   const handleUpdateCategory = async (e) => {
//     e.preventDefault();
//     if (editCategoryName.trim()) {
//       try {
//         await updateCategory({ id: editCategoryId, name: editCategoryName }).unwrap();
//         setEditCategoryId(null); // Clear edit state
//         setEditCategoryName('');
//       } catch (err) {
//         console.error('Failed to update category: ', err);
//       }
//     }
//   };

//   // Handler for deleting a category
//   const handleDeleteCategory = async (id) => {
//     try {
//       await deleteCategory(id).unwrap();
//     } catch (err) {
//       console.error('Failed to delete category: ', err);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading categories</p>;

//   return (
//     <div>
//       <h1>Categories</h1>

//       {/* Form for creating a new category */}
//       <form onSubmit={handleCreateCategory}>
//         <input
//           type="text"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           placeholder="Add new category"
//         />
//         <button type="submit">Create Category</button>
//       </form>

//       {/* List of categories */}
//       <ul>
//         {categories?.map((category) => (
//           <li key={category.id}>
//             {editCategoryId === category.id ? (
//               <form onSubmit={handleUpdateCategory}>
//                 <input
//                   type="text"
//                   value={editCategoryName}
//                   onChange={(e) => setEditCategoryName(e.target.value)}
//                   placeholder="Edit category name"
//                 />
//                 <button type="submit">Update</button>
//                 <button onClick={() => setEditCategoryId(null)}>Cancel</button>
//               </form>
//             ) : (
//               <>
//                 {category.name}
//                 <button onClick={() => {
//                   setEditCategoryId(category.id);
//                   setEditCategoryName(category.name);
//                 }}>Edit</button>
//                 <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoriesPage;


// import { apiSlice } from './apiSlices'; // Import the base API slice
// import { CATEGORIES_URL } from '../constant'; // URL for the categories API endpoint

// export const categoryApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Fetch all categories
//     getCategories: builder.query({
//       query: () => ({
//         url: CATEGORIES_URL,
//         method: 'GET',
//       }),
//       keepUnusedDataFor: 5, // Keep the fetched data for 5 seconds
//     }),

//     // Create a new category
//     createCategory: builder.mutation({
//       query: (newCategory) => ({
//         url: CATEGORIES_URL,
//         method: 'POST',
//         body: newCategory,
//       }),
//     }),

//     // Update an existing category by ID
//     updateCategory: builder.mutation({
//       query: ({ id, ...updatedCategory }) => ({
//         url: `${CATEGORIES_URL}/${id}`,
//         method: 'PUT',
//         body: updatedCategory,
//       }),
//     }),

//     // Delete a category by ID
//     deleteCategory: builder.mutation({
//       query: (id) => ({
//         url: `${CATEGORIES_URL}/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//   }),
// });

// export const {
//   useGetCategoriesQuery, // Hook to fetch all categories
//   useCreateCategoryMutation, // Hook to create a category
//   useUpdateCategoryMutation, // Hook to update a category
//   useDeleteCategoryMutation, // Hook to delete a category
// } = categoryApiSlice;

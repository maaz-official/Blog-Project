// import { apiSlice } from './apiSlices'; // Import the base API slice
// import { POSTS_URL } from '../constant'; // URL for the posts API endpoint

// export const postApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Create a new blog post
//     createPost: builder.mutation({
//       query: (newPost) => ({
//         url: POSTS_URL,
//         method: 'POST',
//         body: newPost,
//       }),
//     }),

//     // Update an existing blog post by ID
//     updatePost: builder.mutation({
//       query: ({ id, ...updatedPost }) => ({
//         url: `${POSTS_URL}/${id}`,
//         method: 'PUT',
//         body: updatedPost,
//       }),
//     }),

//     // Delete a blog post by ID
//     deletePost: builder.mutation({
//       query: (id) => ({
//         url: `${POSTS_URL}/${id}`,
//         method: 'DELETE',
//       }),
//     }),

//     // Save post as draft
//     saveDraft: builder.mutation({
//       query: (id) => ({
//         url: `${POSTS_URL}/${id}/draft`,
//         method: 'POST',
//       }),
//     }),

//     // Publish draft post
//     publishPost: builder.mutation({
//       query: (id) => ({
//         url: `${POSTS_URL}/${id}/publish`,
//         method: 'POST',
//       }),
//     }),
//   }),
// });

// export const {
//   useCreatePostMutation, // Hook to create a new blog post
//   useUpdatePostMutation, // Hook to update a blog post
//   useDeletePostMutation, // Hook to delete a blog post
//   useSaveDraftMutation, // Hook to save a blog post as a draft
//   usePublishPostMutation, // Hook to publish a draft post
// } = postApiSlice;


// import React, { useState } from 'react';
// import { useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation, useSaveDraftMutation, usePublishPostMutation } from '../features/postApiSlice';

// const BlogPostPage = () => {
//   const [createPost] = useCreatePostMutation();
//   const [updatePost] = useUpdatePostMutation();
//   const [deletePost] = useDeletePostMutation();
//   const [saveDraft] = useSaveDraftMutation();
//   const [publishPost] = usePublishPostMutation();

//   // State to handle form inputs
//   const [postTitle, setPostTitle] = useState('');
//   const [postContent, setPostContent] = useState('');
//   const [editPostId, setEditPostId] = useState(null);

//   // Handler to create a new post
//   const handleCreatePost = async () => {
//     try {
//       await createPost({ title: postTitle, content: postContent }).unwrap();
//       setPostTitle('');
//       setPostContent('');
//     } catch (err) {
//       console.error('Failed to create post:', err);
//     }
//   };

//   // Handler to update an existing post
//   const handleUpdatePost = async () => {
//     try {
//       await updatePost({ id: editPostId, title: postTitle, content: postContent }).unwrap();
//       setEditPostId(null);
//       setPostTitle('');
//       setPostContent('');
//     } catch (err) {
//       console.error('Failed to update post:', err);
//     }
//   };

//   // Handler to delete a post
//   const handleDeletePost = async (id) => {
//     try {
//       await deletePost(id).unwrap();
//     } catch (err) {
//       console.error('Failed to delete post:', err);
//     }
//   };

//   // Handler to save post as draft
//   const handleSaveDraft = async (id) => {
//     try {
//       await saveDraft(id).unwrap();
//     } catch (err) {
//       console.error('Failed to save draft:', err);
//     }
//   };

//   // Handler to publish a post
//   const handlePublishPost = async (id) => {
//     try {
//       await publishPost(id).unwrap();
//     } catch (err) {
//       console.error('Failed to publish post:', err);
//     }
//   };

//   return (
//     <div>
//       <h1>Blog Post Management</h1>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           placeholder="Post Title"
//           value={postTitle}
//           onChange={(e) => setPostTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Post Content"
//           value={postContent}
//           onChange={(e) => setPostContent(e.target.value)}
//         />
//         {editPostId ? (
//           <button onClick={handleUpdatePost}>Update Post</button>
//         ) : (
//           <button onClick={handleCreatePost}>Create Post</button>
//         )}
//       </form>

//       <h2>Your Posts</h2>
//       {/* Here, you'd map over your posts to display them */}
//       {/* Example Post List */}
//       <ul>
//         {/* Replace this with your actual posts data */}
//         <li>
//           Example Post Title
//           <button onClick={() => setEditPostId(1)}>Edit</button>
//           <button onClick={() => handleDeletePost(1)}>Delete</button>
//           <button onClick={() => handleSaveDraft(1)}>Save as Draft</button>
//           <button onClick={() => handlePublishPost(1)}>Publish</button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default BlogPostPage;

import { POST_URL } from '../constant'; // Import your POST_URL constant
import { apiSlice } from './apiSlices'; // Import the base API slice

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all posts
    getPosts: builder.query({
      query: () => ({
        url: POST_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    // Fetch post details by id
    getPostById: builder.query({
      query: (postId) => ({
        url: `${POST_URL}/${postId}`, // Request a single post by ID
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    // Create a new post
    createPost: builder.mutation({
      query: (postData) => ({
        url: POST_URL,
        method: 'POST',
        body: postData,
      }),
    }),

    // Update a post by id
    updatePost: builder.mutation({
      query: ({ id, postData }) => ({
        url: `${POST_URL}/${id}`,
        method: 'PUT',
        body: postData,
      }),
    }),

    // Delete a post by id
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery, // Hook to fetch all posts
  useGetPostByIdQuery, // Hook to fetch a post by ID
  useCreatePostMutation, // Hook to create a new post
  useUpdatePostMutation, // Hook to update a post
  useDeletePostMutation, // Hook to delete a post
} = postApiSlice;

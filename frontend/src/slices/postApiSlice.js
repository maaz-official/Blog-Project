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
    getById: builder.query({
      query: (postId) => ({
        url: `${POST_URL}/${postId}`, // Request a single post by ID
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetPostsQuery, // Hook to fetch all posts
  useGetByIdQuery, // Hook to fetch a detailed post by ID
} = postApiSlice;

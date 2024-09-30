import { TAG_URL } from '../constant'; // Adjust the import based on where TAG_URL is defined
import { apiSlice } from './apiSlices';

export const tagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      // Ensure the query is structured properly for fetching archived tags
      query: ({ archived } = {}) => ({
        url: TAG_URL,
        method: 'GET',
        params: archived !== undefined ? { archived } : {},  // Check if archived is defined, else send empty params
      }),
    }),

    getTagById: builder.query({
      query: (id) => ({
        url: `${TAG_URL}/${id}`,
        method: 'GET',
      }),
    }),

    createTag: builder.mutation({
      query: (newTag) => ({
        url: TAG_URL,
        method: 'POST',
        body: newTag,
      }),
    }),

    deleteTag: builder.mutation({
      query: (id) => ({
        url: `${TAG_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    updateTag: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TAG_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    toggleArchiveTag: builder.mutation({
      query: (id) => ({
        url: `${TAG_URL}/${id}/archive`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagByIdQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
  useToggleArchiveTagMutation,
} = tagApiSlice;

import { CATEGORY_URL } from '../constant';
import { apiSlice } from './apiSlices';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      // Ensure the query is structured properly for fetching archived categories
      query: ({ archived } = {}) => ({
        url: CATEGORY_URL,
        method: 'GET',
        params: archived !== undefined ? { archived } : {},  // Check if archived is defined, else send empty params
      }),
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'GET',
      }),
    }),

    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: CATEGORY_URL,
        method: 'POST',
        body: newCategory,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    toggleArchiveCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}/archive`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useToggleArchiveCategoryMutation,
} = categoryApiSlice;

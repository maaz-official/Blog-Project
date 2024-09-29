import { CATEGORY_URL } from '../constant';
import { apiSlice } from './apiSlices';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all categories
    getCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
        method: 'GET',
      }),
    }),

    // Fetch a single category by ID
    getCategoryById: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'GET',
      }),
    }),

    // Create a new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: CATEGORY_URL,
        method: 'POST',
        body: newCategory,
      }),
    }),

    // Delete category by ID
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    // Update category by ID
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,  // Export createCategoryMutation hook
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApiSlice;

import { USER_URL } from '../constant';
import { apiSlice } from './apiSlices';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login user
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),

    // Register new user
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),

    // Get all users (Admin only)
    getUsers: builder.query({
      query: () => ({
        url: `${USER_URL}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    // Get user by ID (Admin only)
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // Update user by ID (Admin only)
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USER_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),

    // Delete user by ID (Admin only)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

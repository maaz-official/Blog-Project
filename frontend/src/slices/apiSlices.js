import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',  // Ensure cookies (with JWT token) are sent with every request
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Post', 'Category', 'User', 'Comment', 'Tag'],
  endpoints: (builder) => ({}), // You'll define your endpoints here
});

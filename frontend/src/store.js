import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlices';
import authSlice from './slices/authSlice';
import userStatusSlice from './slices/userStatusSlice'; // Import the user status slice

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // API slice for handling async requests
    auth: authSlice, // Auth slice for managing user authentication
    userStatus: userStatusSlice, // User status slice to track online/offline status
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Applying API slice middleware
  devTools: true, // Enable Redux DevTools in development
});

export default store;

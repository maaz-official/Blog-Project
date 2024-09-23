import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlices';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Corrected this to use apiSlice.reducer
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware), // Apply apiSlice middleware
  devTools: true,
});

export default store;

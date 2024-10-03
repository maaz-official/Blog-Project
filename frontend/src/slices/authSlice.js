import { createSlice } from '@reduxjs/toolkit';

// Initial state with userInfo fetched from localStorage or set to null
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set user credentials
        setCredential: (state, action) => {
            state.userInfo = action.payload; // Update state with user information
            localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Persist user info in localStorage
        },
        // Action to logout user
        logout: (state) => {
            state.userInfo = null; // Clear the userInfo state
            localStorage.removeItem('userInfo'); // Remove userInfo from localStorage
        },
    },
});

// Exporting actions and reducer
export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;

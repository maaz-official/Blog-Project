import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null; // Clear the userInfo state
            localStorage.removeItem('userInfo'); // Remove userInfo from localStorage
        },
    },
});

// Exporting actions and reducer
export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;

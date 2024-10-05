// slices/userStatusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: {}, // Store user statuses by their IDs
};

const userStatusSlice = createSlice({
    name: 'userStatus',
    initialState,
    reducers: {
        setUserStatus: (state, action) => {
            const { userId, status } = action.payload;
            state.status[userId] = status;
        },
    },
});

export const { setUserStatus } = userStatusSlice.actions;
export default userStatusSlice.reducer;

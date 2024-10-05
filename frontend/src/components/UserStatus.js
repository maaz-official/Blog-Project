// Example: components/UserStatus.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../services/socket';
import { setUserStatus } from '../slices/userStatusSlice'; // Create this slice for user status

const UserStatus = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth); // Select the logged-in user

    useEffect(() => {
        if (userInfo) {
            // Emit login event when user is logged in
            socket.emit('userLogin', userInfo.id);

            // Listen for status updates
            socket.on('userStatus', (data) => {
                dispatch(setUserStatus(data)); // Dispatch the user status to the store
            });

            // Emit logout event when user logs out
            return () => {
                socket.emit('userLogout', userInfo.id);
            };
        }
    }, [userInfo, dispatch]);

    return <div>User is {userInfo ? 'active' : 'inactive'}</div>;
};

export default UserStatus;

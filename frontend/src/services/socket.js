// services/socket.js

import { io } from 'socket.io-client';
import { BASE_URL } from '../constant';

// Initialize the socket connection
const socket = io(BASE_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true, // Ensure credentials are passed along
});

// Function to emit user login
export const userLogin = (userId) => {
  if (userId) {
    socket.emit('userLogin', userId);
  }
};

// Function to handle user logout
export const userLogout = (userId) => {
  if (userId) {
    socket.emit('userLogout', userId);
  }
};

// Handle disconnection and reconnection to maintain user status
socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

socket.on('connect', () => {
  console.log('Socket connected');
});

// Export the socket instance
export default socket;

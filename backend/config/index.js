import { Server } from 'socket.io';
import { User } from '../model/userModel.js'; // Update with the correct path to your User model

let io;
const socketToUserMap = {}; // Mapping of socket IDs to user IDs
const connectionTimeouts = {}; // Mapping of socket IDs to timeouts

const createSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000", // Allow requests from the React frontend
            methods: ["GET", "POST"], // Allowed HTTP methods
            credentials: true, // Allow credentials
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Listen for user login event
        socket.on('userLogin', async (userId) => {
            socket.join(userId); // Join the user's specific room
            console.log(`User ${userId} logged in`);

            // Store the mapping of socket ID to user ID
            socketToUserMap[socket.id] = userId;

            try {
                // Update user status to 'active' in the database
                await User.updateUserStatus(userId, 'active');

                // Emit updated status to all connected clients
                io.emit('userStatus', { userId, status: 'active' });
            } catch (error) {
                console.error('Error updating user status:', error);
            }

            // Start a timeout for this connection
            startTimeout(socket);
        });

        // Handle "Keep alive!" event
        socket.on('keepAlive', () => {
            console.log(`Keep alive from user: ${socket.id}`);
            resetTimeout(socket); // Reset the timeout when the button is clicked
        });

        // Handle user logout event
        socket.on('userLogout', async (userId) => {
            console.log(`User ${userId} logged out`);

            try {
                // Update user status to 'inactive' in the database
                await User.updateUserStatus(userId, 'inactive');

                // Emit updated status to all connected clients
                io.emit('userStatus', { userId, status: 'inactive' });
            } catch (error) {
                console.error('Error updating user status:', error);
            }

            // Remove the mapping when user logs out
            clearTimeout(connectionTimeouts[socket.id]);
            delete socketToUserMap[socket.id];
        });

        // Handle user disconnection
        socket.on('disconnect', async () => {
            console.log('A user disconnected:', socket.id);

            // Retrieve userId from the mapping
            const userId = socketToUserMap[socket.id];
            if (userId) {
                try {
                    await User.updateUserStatus(userId, 'inactive');
                    io.emit('userStatus', { userId, status: 'inactive' });

                    // Clean up the mapping
                    delete socketToUserMap[socket.id];
                    clearTimeout(connectionTimeouts[socket.id]);
                } catch (error) {
                    console.error('Error updating user status on disconnect:', error);
                }
            }
        });
    });

    const startTimeout = (socket) => {
        // Clear any existing timeout for this socket
        clearTimeout(connectionTimeouts[socket.id]);

        // Set a new timeout for 3 hours
        connectionTimeouts[socket.id] = setTimeout(() => {
            const userId = socketToUserMap[socket.id];
            if (userId) {
                io.emit('userStatus', { userId, status: 'semi-dead' });
                console.log(`User ${userId} is semi-dead: ${socket.id}`);
            }
        }, 10800000); // 3 hours in milliseconds
    };

    const resetTimeout = (socket) => {
        console.log(`Resetting timeout for socket: ${socket.id}`);
        startTimeout(socket);
    };

    return io;
};

export { io };
export default createSocketServer;

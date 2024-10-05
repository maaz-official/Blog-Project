import express from 'express';
import http from 'http'; // Import http module
import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import tagRoutes from './routes/tagsRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import createSocketServer from './config/index.js'; // Import socket.io setup

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Connect to the database
connectDB().catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit with failure
});

// CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
}));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Create HTTP server
const server = http.createServer(app); // Create an HTTP server from the Express app

// Initialize socket.io with the HTTP server
const io = createSocketServer(server); // Call the function to set up socket.io

// Set 'io' as a global variable in the app
app.set('io', io); // Now you can access 'io' via 'req.app.get('io')' in any route or middleware

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send("API is running............");
});

// Error handling middleware (should be placed after route definitions)
app.use(notFound);
app.use(errorHandler);

// Start server
server.listen(PORT, () => { // Use the HTTP server to listen
    console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoutes.js'; // Import post routes
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

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

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); // Use post routes

// Root route for testing
app.get('/', (req, res) => {
    res.send("API is running............");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import userRoutes from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';  // Already imported

const app = express();
const PORT = 5000;

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// CORS middleware - allows all origins, or you can configure specific origins
app.use(cors({
    origin: 'http://localhost:3000', // This allows requests from any origin. You can specify a specific domain instead, like 'http://example.com'
    credentials: true, // Allow cookies to be sent
}));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define API routes
app.use('/api/users', userRoutes);  // Note the correction: "/api/users"

// Root route for testing
app.get('/', (req, res) => {
    res.send("API is running............");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

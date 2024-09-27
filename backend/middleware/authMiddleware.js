import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../model/userModel.js';

// Protect routes middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token exists in cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify token and extract user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "maaz1234");
            req.user = await User.findById(decoded.id).select('-password'); // Extract user ID from JWT and attach to req.user
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Admin Middleware for Admin-only routes
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Proceed if user is admin
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };

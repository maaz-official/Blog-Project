import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { User, UserRole } from '../model/userModel.js'; // Import UserRole enum

// Protect routes middleware (token from cookies)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token exists in cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify token and extract user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "maaz1234");
            req.user = await User.findById(decoded.id).select('-password'); // Attach user object to request, excluding password
            next(); // Move to the next middleware or route handler
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

// Role-based access control (RBAC) middleware
const hasRole = (...roles) => {
    return (req, res, next) => {
        if (req.user && roles.some(role => req.user.roles.includes(role))) {
            next(); // Proceed if user has the required role(s)
        } else {
            res.status(403); // Forbidden
            throw new Error('Not authorized, insufficient privileges');
        }
    };
};

// Specific admin and moderator role middleware
const admin = hasRole(UserRole.ADMIN); // Middleware for 'admin' role
const moderator = hasRole(UserRole.MODERATOR); // Middleware for 'moderator' role

// You can create additional middleware for combined role checks if needed
const adminOrModerator = hasRole(UserRole.ADMIN, UserRole.MODERATOR); // Middleware for 'admin' or 'moderator' roles

export { protect, admin, moderator, adminOrModerator, hasRole };

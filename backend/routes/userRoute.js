import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
} from '../controllers/userController.js';

// Public routes
router.route('/register').post(registerUser); // Register new user
router.post('/auth', authUser); // User login
router.post('/logout', logoutUser); // User logout

// Protected routes (only for authenticated users)
// Added 'upload.single' middleware for profile image upload
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, upload.single('image'), updateUserProfile); // Update profile with image upload

// // Admin routes (only for admins)
// router.route('/').get(protect, admin, getUsers); // Get all users (admin only)
// router
//   .route('/:id')
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser); // Get, update, delete user by ID (admin only)

export default router;

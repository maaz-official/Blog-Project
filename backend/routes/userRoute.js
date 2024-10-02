import express from 'express';
import {
  authUser,
  registerUser,
  getUserById,
  logoutUser,
  updateUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  followUser,
  unfollowUser,
  banUser,
  unbanUser,
} from '../controllers/userController.js';
import { protect, admin, moderator, adminOrModerator } from '../middleware/authMiddleware.js';

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User authentication
router.post('/auth', authUser);

// User logout
router.post('/logout', logoutUser);

// User profile routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin routes to manage users
router.route('/')
  .get(protect, adminOrModerator, getUsers); // Access for admin or moderator

router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Follow/Unfollow routes
router.route('/follow')
  .post(protect, followUser);

router.route('/unfollow')
  .post(protect, unfollowUser);

// Ban/Unban routes (Admin only)
router.patch('/ban/:id', protect, admin, banUser);
router.patch('/unban/:id', protect, admin, unbanUser);

export default router;

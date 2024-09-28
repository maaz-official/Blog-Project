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
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/register').post(registerUser);
router.route('/auth').post(authUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;

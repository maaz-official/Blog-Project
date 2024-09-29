import express from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for getting all categories (Public) and creating a new one (Admin only)
router.route('/')
    .get(getCategories)       // GET /api/categories (Public)
    .post(protect, admin, createCategory);    // POST /api/categories (Protected: Admin only)

// Route for getting (Public), updating (Admin), and deleting (Admin) a specific category
router.route('/:id')
    .get(getCategoryById)     // GET /api/categories/:id (Public)
    .put(protect, admin, updateCategory)      // PUT /api/categories/:id (Protected: Admin only)
    .delete(protect, admin, deleteCategory);  // DELETE /api/categories/:id (Protected: Admin only)

export default router;

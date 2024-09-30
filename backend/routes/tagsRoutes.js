import express from 'express';
import {
    createTag,
    getTags,
    getTagById,
    updateTag,
    deleteTag,
    toggleArchiveTag
} from '../controllers/tagsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for getting all tags (Public) and creating a new one (Admin only)
router.route('/')
    .get(getTags)         // GET /api/tags (Public)
    .post(protect, admin, createTag); // POST /api/tags (Protected: Admin only)

// Route for getting (Public), updating (Admin), and deleting (Admin) a specific tag
router.route('/:id')
    .get(getTagById)     // GET /api/tags/:id (Public)
    .put(protect, admin, updateTag)    // PUT /api/tags/:id (Protected: Admin only)
    .delete(protect, admin, deleteTag); // DELETE /api/tags/:id (Protected: Admin only)

// Route for toggling archive status (Protected: Admin only)
router.route('/:id/archive')
    .put(protect, admin, toggleArchiveTag); // PUT /api/tags/:id/archive (Protected: Admin only)

export default router;

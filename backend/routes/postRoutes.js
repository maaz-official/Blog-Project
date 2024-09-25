import express from 'express';
import { getAllPosts, getPostById } from '../controllers/postController.js'; // Import controllers

const router = express.Router();

// Define post-related routes
router.get('/', getAllPosts); // Route to get all posts
router.get('/:id', getPostById); // Route to get a post by ID

export default router;

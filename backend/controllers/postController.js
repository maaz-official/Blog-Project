import Post from '../model/postModel.js';
import Category from '../model/categoryModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get All Posts with category
// @route   GET /api/posts/
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate('category', 'name description'); // Populate category details
    res.json(posts);
});


// @desc    Get Post By ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Fetch post by ID from MongoDB
    const post = await Post.findById(id).populate('category', 'name description');

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// @desc    Create a new Post
// @route   POST /api/posts/
// @access  Public
export const createPost = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        content,
        coverImage,
        category,
        tags,
        likes,
        shares,
        views,
        readTime,
        comments,
    } = req.body;

    // Validate if the category exists
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
    }

    // Create new post using the Post model
    const post = new Post({
        title,
        author,
        content,
        coverImage,
        category,  // Use the valid category ID here
        tags,
        likes,
        shares,
        views,
        readTime,
        comments,
    });

    // Save the post to MongoDB
    const createdPost = await post.save();

    res.status(201).json(createdPost);
});

// @desc    Update Post by ID
// @route   PUT /api/posts/:id
// @access  Public
export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        title,
        author,
        content,
        coverImage,
        category,
        tags,
        likes,
        shares,
        views,
        readTime,
        comments,
    } = req.body;

    // Find the post by ID
    const post = await Post.findById(id);

    if (post) {
        // If category is provided, validate it
        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({ message: 'Invalid category' });
            }
            post.category = category;  // Update category if valid
        }

        // Update other post details
        post.title = title || post.title;
        post.author = author || post.author;
        post.content = content || post.content;
        post.coverImage = coverImage || post.coverImage;
        post.tags = tags || post.tags;
        post.likes = likes || post.likes;
        post.shares = shares || post.shares;
        post.views = views || post.views;
        post.readTime = readTime || post.readTime;
        post.comments = comments || post.comments;

        // Save the updated post
        const updatedPost = await post.save();

        res.json(updatedPost);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// @desc    Delete Post by ID
// @route   DELETE /api/posts/:id
// @access  Public
export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the post by ID
    const post = await Post.findById(id);

    if (post) {
        // Remove the post from MongoDB
        await post.remove();
        res.json({ message: "Post removed" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

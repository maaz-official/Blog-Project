import Post from '../model/postModel.js'; // Assuming your Post model is in the models folder


// Controller to get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from MongoDB
        res.json(posts); // Send all posts as JSON response
    } catch (error) {
        res.status(500).json({ message: "Server error, unable to fetch posts." });
    }
};

// Controller to get a post by ID
export const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch post by ID from MongoDB
        const post = await Post.findById(id);

        if (post) {
            res.json(post); // Send the found post
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error, unable to fetch the post." });
    }
};
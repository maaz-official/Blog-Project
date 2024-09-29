import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: {
        name: { type: String, required: true },
        profilePicture: { type: String, required: true },
    },
    content: { type: String, required: true },
    coverImage: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the Category model
        ref: 'Category',  // Referencing the Category model
        required: true,   // Category is required for each post
    },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [
        {
            author: { name: String, profilePicture: String },
            content: String,
            createdAt: { type: Date, default: Date.now },
            likes: { type: Number, default: 0 },
            replies: [
                {
                    author: { name: String, profilePicture: String },
                    content: String,
                    createdAt: { type: Date, default: Date.now },
                },
            ],
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

export default Post;

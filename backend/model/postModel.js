import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    profilePicture: { type: String, required: true },
  },
  content: { type: String, required: true },
  coverImage: { type: String },
  
  // Reference to Category
  category: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Category model
    ref: 'Category',  // Referencing the Category model
    required: true,   // Category is required for each post
  },

  // Reference to Tags (an array of ObjectId references to Tag model)
  tags: [{ 
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Tag model
    ref: 'Tag',   // Referencing the Tag model
  }],

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

// Export the Post model
const Post = mongoose.model('Post', postSchema);

export default Post;

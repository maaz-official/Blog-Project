import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Ensure tag names are unique
        trim: true,    // Remove whitespace from both ends
    },
    description: {
        type: String,
        trim: true,    // Remove whitespace from both ends
    },
    isArchived: {
        type: Boolean,
        default: false, // Default is not archived
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Export the Tag model
const Tag = mongoose.model('Tag', tagSchema);
export default Tag;

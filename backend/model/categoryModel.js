import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Ensure category names are unique
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,  // Adds createdAt and updatedAt fields
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

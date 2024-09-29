import Category from '../model/categoryModel.js';
import Post from '../model/postModel.js';  // Import Post model

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private (Admin only)
export const createCategory = async (req, res) => {
    const { name, description, isArchived = false } = req.body;

    console.log('Received data:', req.body);  // Add this to log incoming data for debugging

    try {
        const categoryExists = await Category.findOne({ name });

        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({
            name,
            description,
            isArchived,  // Set archive status based on the input
        });

        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        console.error('Error creating category:', error);  // Log error for debugging
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get all categories with optional archived filter
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        // Check if the 'archived' query param is provided, and convert it to a boolean
        const showArchived = req.query.archived === 'true'; // true if archived=true, otherwise false

        // Set the filter based on the 'archived' query param
        const filter = { isArchived: showArchived };

        // Fetch categories based on the filter
        const categories = await Category.find(filter);

        // If no categories are found, return an empty array
        if (categories.length === 0) {
            return res.status(200).json([]); // Return empty array if no categories found
        }

        // Send the categories to the client
        res.status(200).json(categories);
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
export const updateCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            category.name = name || category.name;
            category.description = description || category.description;

            const updatedCategory = await category.save();
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            await category.remove();
            res.status(200).json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle archive status of a category
// @route   PUT /api/categories/:id/archive
// @access  Private (Admin only)
export const toggleArchiveCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.isArchived = !category.isArchived;  // Toggle the archive status
        await category.save();

        res.status(200).json({
            message: `Category ${category.isArchived ? 'archived' : 'unarchived'} successfully`,
            category,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

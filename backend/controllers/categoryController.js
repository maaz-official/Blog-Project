import Category from '../model/categoryModel.js';  // Assuming you save the Category model here

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private (Admin only)
export const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const categoryExists = await Category.findOne({ name });

        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({
            name,
            description,
        });

        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
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

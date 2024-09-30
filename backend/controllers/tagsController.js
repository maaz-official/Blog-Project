import asyncHandler from '../middleware/asyncHandler.js';
import Tag from '../model/tagsModel.js'; // Import Tag model

// @desc    Create a new tag
// @route   POST /api/tags
// @access  Private (Admin only)
export const createTag = asyncHandler(async (req, res) => {
    const { name, description, isArchived = false } = req.body;

    // Validate input data
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Tag name is required and must be a valid string' });
    }

    console.log('Received data:', req.body); // Log incoming data for debugging

    try {
        // Check if the tag already exists
        const tagExists = await Tag.findOne({ name: name.trim() }); // Trim whitespace for accuracy

        if (tagExists) {
            return res.status(400).json({ message: 'Tag already exists' });
        }

        // Create the new tag
        const tag = new Tag({
            name: name.trim(), // Trim whitespace
            description: description ? description.trim() : '', // Trim description if provided
            isArchived, // Set archive status based on the input
        });

        const createdTag = await tag.save(); // Save the new tag to the database
        res.status(201).json(createdTag); // Respond with the created tag
    } catch (error) {
        console.error('Error creating tag:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error, please try again later' }); // General error message
    }
});


// @desc    Get all tags with optional archived filter
// @route   GET /api/tags
// @access  Public
export const getTags = asyncHandler(async (req, res) => {
    try {
        // Check if the 'archived' query param is provided, and convert it to a boolean
        const showArchived = req.query.archived === 'true'; // true if archived=true, otherwise false

        // Set the filter based on the 'archived' query param
        const filter = { isArchived: showArchived };

        // Fetch tags based on the filter
        const tags = await Tag.find(filter);

        // If no tags are found, return an empty array
        if (tags.length === 0) {
            return res.status(200).json([]); // Return empty array if no tags found
        }

        // Send the tags to the client
        res.status(200).json(tags);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error retrieving tags:', error); // Log error for debugging
        // Send an error response if something goes wrong
        res.status(500).json({ message: error.message });
    }
});


// @desc    Get a tag by ID
// @route   GET /api/tags/:id
// @access  Private (Admin only)
export const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);

        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// @desc    Update a tag
// @route   PUT /api/tags/:id
// @access  Private (Admin only)
export const updateTag = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid tag ID' });
    }

    try {
        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        // Update tag properties
        if (name) tag.name = name.trim();
        if (description) tag.description = description.trim();

        const updatedTag = await tag.save();
        res.status(200).json(updatedTag);
    } catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});


// @desc    Delete a tag
// @route   DELETE /api/tags/:id
// @access  Private (Admin only)
export const deleteTag = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid tag ID' });
    }

    try {
        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        await tag.remove();
        res.status(200).json({ message: 'Tag removed' });
    } catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});


// @desc    Toggle archive status of a tag
// @route   PUT /api/tags/:id/archive
// @access  Private (Admin only)
export const toggleArchiveTag = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid tag ID' });
    }

    try {
        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        tag.isArchived = !tag.isArchived; // Toggle the archive status
        await tag.save();

        res.status(200).json({
            message: `Tag ${tag.isArchived ? 'archived' : 'unarchived'} successfully`,
            tag,
        });
    } catch (error) {
        console.error('Error toggling archive status:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

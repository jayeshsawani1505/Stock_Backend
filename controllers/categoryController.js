const {
    createCategoryService,
    getCategoryService,
    getCategoriesService,
    updateCategoryService,
    deleteCategoryService
} = require('../services/categoryService');

// Create new category
const createCategoryHandler = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        const newCategory = await createCategoryService({ category_name, description });
        res.status(201).json({ message: 'Category created successfully', data: newCategory });
    } catch (error) {
        console.error('Error in createCategoryHandler:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get a specific category by ID
const getCategoryHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryService(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ data: category });
    } catch (error) {
        console.error('Error in getCategoryHandler:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all categories
const getCategoriesHandler = async (req, res) => {
    try {
        const categories = await getCategoriesService();
        res.status(200).json({ data: categories });
    } catch (error) {
        console.error('Error in getCategoriesHandler:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update a category by ID
const updateCategoryHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name, description } = req.body;
        const updatedCategory = await updateCategoryService(id, { category_name, description });
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category updated successfully', data: updatedCategory });
    } catch (error) {
        console.error('Error in updateCategoryHandler:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a category by ID
const deleteCategoryHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await deleteCategoryService(id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCategoryHandler:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCategoryHandler,
    getCategoryHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler
};

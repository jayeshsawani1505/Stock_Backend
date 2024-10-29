const express = require('express');
const {
    createCategoryHandler,
    getCategoryHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} = require('../controllers/categoryController');

const router = express.Router();

// Create a new category
router.post('/', createCategoryHandler);

// Get a specific category by ID
router.get('/:id', getCategoryHandler);

// Get all categories
router.get('/', getCategoriesHandler);

// Update a category by ID
router.put('/:id', updateCategoryHandler);

// Delete a category by ID
router.delete('/:id', deleteCategoryHandler);

module.exports = router;

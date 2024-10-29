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
router.post('/categories', createCategoryHandler);

// Get a specific category by ID
router.get('/categories/:id', getCategoryHandler);

// Get all categories
router.get('/categories', getCategoriesHandler);

// Update a category by ID
router.put('/categories/:id', updateCategoryHandler);

// Delete a category by ID
router.delete('/categories/:id', deleteCategoryHandler);

module.exports = router;

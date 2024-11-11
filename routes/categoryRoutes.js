const express = require('express');
const {
    createCategoryHandler,
    getCategoryHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
    uploadExcelHandler
} = require('../controllers/categoryController');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage for uploaded files

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

// Route to upload and process Excel file for categories
router.post('/upload-excel', upload.single('file'), uploadExcelHandler);

module.exports = router;

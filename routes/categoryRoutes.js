const express = require('express');
const router = express.Router();
const {
    createCategoryHandler,
    getCategoryHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
    uploadExcelHandler
} = require('../controllers/categoryController');
const multer = require('multer');
const path = require('path');

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/category')); // Ensure 'uploads/category' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});
 
const upload = multer({ storage });

// Create a new category
router.post('/', upload.single('category_photo'), createCategoryHandler);

// Get a specific category by ID
router.get('/:id', getCategoryHandler);

// Get all categories
router.get('/', getCategoriesHandler);

// Update a category by ID
router.put('/:id', upload.single('category_photo'), updateCategoryHandler);

// Delete a category by ID
router.delete('/:id', deleteCategoryHandler);

// Route to upload and process Excel file for categories
router.post('/upload-excel', upload.single('file'), uploadExcelHandler);

module.exports = router;

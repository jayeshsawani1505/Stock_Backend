const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/product')); // Ensure 'uploads/product' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage });

// Create a new product
router.post('/', upload.single('product_image'), productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get product by category Id
router.get('/category/:categoryId', productController.getProductByCategoryId);

// Get a product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID
router.put('/:id', upload.single('product_image'), productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

// API to upload and process Excel file for products
router.post('/upload-excel', upload.single('file'), productController.uploadExcel);

// Route to add items to stock (in-stock)
router.post('/in-stock/:id', productController.addStock);

// Route to remove items from stock (out-stock)
router.post('/out-stock/:id', productController.removeStock);

router.get('/report/filter', productController.getFilteredProducts);

module.exports = router;

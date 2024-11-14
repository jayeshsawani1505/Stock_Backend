const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const multer = require('multer');
const path = require('path');

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/customer')); // Ensure 'uploads/customer' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage });

// Create a new customer
router.post('/', upload.single('profile_photo'), customerController.createCustomer); // Image upload for customer

// Get all customers
router.get('/', customerController.getAllCustomers);

router.get('/count', customerController.getCustomerCount);

// Get a customer by ID
router.get('/:id', customerController.getCustomerById);

// Update a customer by ID
router.put('/:id', upload.single('profile_photo'), customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

// API to upload and process Excel file
router.post('/upload-excel', upload.single('file'), customerController.uploadExcel);

module.exports = router;
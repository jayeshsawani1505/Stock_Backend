// routes/signatureRoutes.js
const express = require('express');
const signatureController = require('../controllers/signatureController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/signature')); // Ensure 'uploads/signature' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage });
const router = express.Router();

// Create a new signature
router.post('/', upload.single('signature_photo'), signatureController.createSignature);

// Get a signature by ID
router.get('/:id', signatureController.getSignatureById);

// Get all signatures
router.get('/', signatureController.getAllSignatures);

// Update a signature by ID
router.put('/:id', upload.single('signature_photo'), signatureController.updateSignature);

// Delete a signature by ID
router.delete('/:id', signatureController.deleteSignature);

module.exports = router;

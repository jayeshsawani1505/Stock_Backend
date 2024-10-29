// routes/signatureRoutes.js
const express = require('express');
const signatureController = require('../controllers/signatureController');

const router = express.Router();

// Create a new signature
router.post('/', signatureController.createSignature);

// Get a signature by ID
router.get('/:id', signatureController.getSignatureById);

// Get all signatures
router.get('/', signatureController.getAllSignatures);

// Update a signature by ID
router.put('/:id', signatureController.updateSignature);

// Delete a signature by ID
router.delete('/:id', signatureController.deleteSignature);

module.exports = router;

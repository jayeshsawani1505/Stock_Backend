const express = require('express');
const router = express.Router();
const subproductController = require('../controllers/subproductController');

// Create a new subproduct
router.post('/', subproductController.createSubproduct);

// Get all subproducts
router.get('/', subproductController.getAllSubproducts);

// Get a subproduct by ID
router.get('/:id', subproductController.getSubproductById);

// Update a subproduct by ID
router.put('/:id', subproductController.updateSubproduct);

// Delete a subproduct by ID
router.delete('/:id', subproductController.deleteSubproduct);

module.exports = router;

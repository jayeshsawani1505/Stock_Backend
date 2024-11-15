const express = require('express');
const router = express.Router();
const subproductController = require('../controllers/subproductController');

// Create a new subproduct
router.post('/', subproductController.createSubproduct);

// Get all subproducts
router.get('/', subproductController.getAllSubproducts);

// Get a subproduct by ID
router.get('/:id', subproductController.getSubproductById);

// Get Sub Product by Product Id
router.get('/product/:product_id', subproductController.getSubproductsByProductId);

// Update a subproduct by ID
router.put('/:id', subproductController.updateSubproduct);

// Delete a subproduct by ID
router.delete('/:id', subproductController.deleteSubproduct);

// Route to add items to stock (in-stock)
router.post('/in-stock/:id', subproductController.addStock);

// Route to remove items from stock (out-stock)
router.post('/out-stock/:id', subproductController.removeStock);

module.exports = router;

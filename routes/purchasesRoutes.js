const express = require('express');
const router = express.Router();
const purchasesController = require('../controllers/purchasesController');

// Create a new purchase
router.post('/', purchasesController.createPurchase);

// Get all purchases
router.get('/', purchasesController.getAllPurchases);

// Get a purchase by ID
router.get('/:id', purchasesController.getPurchaseById);

// Update a purchase by ID
router.put('/:id', purchasesController.updatePurchase);

// Delete a purchase by ID
router.delete('/:id', purchasesController.deletePurchase);

module.exports = router;

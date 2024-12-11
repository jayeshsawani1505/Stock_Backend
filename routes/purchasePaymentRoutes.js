const express = require('express');
const router = express.Router();
const purchasePaymentController = require('../controllers/purchasePaymentController');

// Create a new purchase payment
router.post('/', purchasePaymentController.createPurchasePayment);

// Get a purchase payment by ID
router.get('/:id', purchasePaymentController.getPurchasePayment);

// Get all purchase payments
router.get('/', purchasePaymentController.getPurchasePayments);

// Update a purchase payment by ID
router.put('/:id', purchasePaymentController.updatePurchasePayment);

// Delete a purchase payment by ID
router.delete('/:id', purchasePaymentController.deletePurchasePayment);

// Get purchase payments by purchase ID
router.get('/purchase/:purchaseId', purchasePaymentController.getPurchasePaymentsByPurchaseId);

// Get filtered purchase payments
router.get('/report/filter', purchasePaymentController.getFilteredPurchasePayments);
router.get('/transaction/report/filter', purchasePaymentController.getFilteredTransactionLogs);

module.exports = router;

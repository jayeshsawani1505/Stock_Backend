const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

// Create a new quotation
router.post('/', quotationController.createQuotation);

// Get all quotations
router.get('/', quotationController.getAllQuotations);

// Get a quotation by ID
router.get('/:id', quotationController.getQuotationById);

// Update a quotation by ID
router.put('/:id', quotationController.updateQuotation);

// Delete a quotation by ID
router.delete('/:id', quotationController.deleteQuotation);

// Get quotations by customer ID
router.get('/customer/:customerId', quotationController.getQuotationsByCustomerId);

module.exports = router;

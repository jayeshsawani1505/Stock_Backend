const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

// Create a new quotation
router.post('/', quotationController.createQuotation);

// Get all quotations
router.get('/', quotationController.getAllQuotations);

router.get('/generateQuotationNumber', quotationController.generateQuotationNumber);

// Get a quotation by ID
router.get('/:id', quotationController.getQuotationById);

// Update a quotation by ID
router.put('/:id', quotationController.updateQuotation);

// Delete a quotation by ID
router.delete('/:id', quotationController.deleteQuotation);

// Get quotations by customer ID
router.get('/customer/:customerId', quotationController.getQuotationsByCustomerId);

router.get('/report/filter', quotationController.getFilteredQuotations);

router.get('/pdf/:id', quotationController.getQuotationDetailsForPDF);

module.exports = router;

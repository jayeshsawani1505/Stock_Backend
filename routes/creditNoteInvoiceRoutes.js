const express = require('express');
const router = express.Router();
const creditNoteInvoiceController = require('../controllers/creditNoteInvoiceController');

// Create a new credit note invoice
router.post('/', creditNoteInvoiceController.createCreditNoteInvoice);

// Get all credit note invoices
router.get('/', creditNoteInvoiceController.getAllCreditNoteInvoices);

// Get a credit note invoice by ID
router.get('/:id', creditNoteInvoiceController.getCreditNoteInvoiceById);

// Update a credit note invoice by ID
router.put('/:id', creditNoteInvoiceController.updateCreditNoteInvoice);

// Delete a credit note invoice by ID
router.delete('/:id', creditNoteInvoiceController.deleteCreditNoteInvoice);

module.exports = router;

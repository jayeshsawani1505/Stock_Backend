const express = require('express');
const router = express.Router();
const creditNoteInvoiceController = require('../controllers/creditNoteInvoiceController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage for uploaded files

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

// Route to upload and process Excel file for categories
router.post('/upload-excel', upload.single('file'), creditNoteInvoiceController.uploadCreditNoteInvoicesExcel);

module.exports = router;

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage for uploaded files

// Create a new invoice
router.post('/', invoiceController.createInvoice);

// Get all invoices
router.get('/', invoiceController.getAllInvoices);

// Get generated Invoice Number
router.get('/generateInvoiceNumber', invoiceController.generateInvoiceNumber);

// Route to get total amounts by status (paid, overdue, cancelled, draft)
router.get('/totals-by-status', invoiceController.getInvoiceTotalsByStatus);

router.get('/count', invoiceController.getTotalInvoiceCount);

// Get an invoice by ID
router.get('/:id', invoiceController.getInvoiceById);

// Update an invoice by ID
router.put('/:id', invoiceController.updateInvoice);

// Delete an invoice by ID
router.delete('/:id', invoiceController.deleteInvoice);

// API to upload and process Excel file for invoices
router.post('/upload-excel', upload.single('file'), invoiceController.uploadExcel);

module.exports = router;

module.exports = router;

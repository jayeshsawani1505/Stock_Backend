const express = require('express');
const router = express.Router();
const returnDebitNotesPurchasesController = require('../controllers/returnDebitNotesPurchasesController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage for uploaded files

// Create a new return debit note
router.post('/', returnDebitNotesPurchasesController.createReturnDebitNote);

// Get all return debit notes
router.get('/', returnDebitNotesPurchasesController.getAllReturnDebitNotes);

// Get return debit note by ID
router.get('/:id', returnDebitNotesPurchasesController.getReturnDebitNoteById);

// Update a return debit note
router.put('/:id', returnDebitNotesPurchasesController.updateReturnDebitNote);

// Delete a return debit note
router.delete('/:id', returnDebitNotesPurchasesController.deleteReturnDebitNote);

// API to upload and process Excel file for products
router.post('/upload-excel', upload.single('file'), returnDebitNotesPurchasesController.uploadExcel);
router.get('/pdf/:id', returnDebitNotesPurchasesController.getReturnForPDF);

module.exports = router;

// routes/creditNoteRoutes.js
const express = require('express');
const creditNoteController = require('../controllers/creditNoteController');

const router = express.Router();

// Create a new credit note
router.post('/', creditNoteController.createCreditNote);

// Get a credit note by ID
router.get('/:id', creditNoteController.getCreditNoteById);

// Get all credit notes
router.get('/', creditNoteController.getAllCreditNotes);

// Update a credit note by ID
router.put('/:id', creditNoteController.updateCreditNote);

// Delete a credit note by ID
router.delete('/:id', creditNoteController.deleteCreditNote);

module.exports = router;

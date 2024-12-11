const express = require('express');
const router = express.Router();
const purchasesController = require('../controllers/purchasesController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage for uploaded files

// Create a new purchase
router.post('/', purchasesController.createPurchase);
// filter purchase report
router.get('/report/filter', purchasesController.getFilteredPurchases);

// Get all purchases
router.get('/', purchasesController.getAllPurchases);

// Get a purchase by ID
router.get('/:id', purchasesController.getPurchaseById);

// Update a purchase by ID
router.put('/:id', purchasesController.updatePurchase);

// Delete a purchase by ID
router.delete('/:id', purchasesController.deletePurchase);

// Route to upload and process Excel file for categories
router.post('/upload-excel', upload.single('file'), purchasesController.uploadPurchasesExcel);

router.put('/status/:id', purchasesController.updatePurchasesStatus);

router.get('/pdf/:id', purchasesController.getPurchasesDetailsForPDF);

module.exports = router;

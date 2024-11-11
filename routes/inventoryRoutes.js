const express = require('express');
const Inventory = require('../controllers/inventoryController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage for uploaded files

const router = express.Router();

// Create a new inventory item
router.post('/', Inventory.createInventoryItem);

// Retrieve all inventory items
router.get('/', Inventory.getAllInventoryItems);

// Retrieve an inventory item by ID
router.get('/:id', Inventory.getInventoryItemById);

// Update an inventory item by ID
router.put('/:id', Inventory.updateInventoryItem);

// Delete an inventory item by ID
router.delete('/:id', Inventory.deleteInventoryItem);

// API to upload and process Excel file for invoices
router.post('/upload-excel', upload.single('file'), Inventory.uploadInventoryExcel);

// Route to add items to stock (in-stock)
router.post('/in-stock/:id', Inventory.addStock);

// Route to remove items from stock (out-stock)
router.post('/out-stock/:id', Inventory.removeStock);
module.exports = router;

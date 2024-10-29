const express = require('express');
const Inventory = require('../controllers/inventoryController');

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

module.exports = router;

const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Create a new vendor
router.post('/', vendorController.createVendor);

// Get all vendors
router.get('/', vendorController.getAllVendors);

// Get a vendor by ID
router.get('/:id', vendorController.getVendorById);

// Update a vendor by ID
router.put('/:id', vendorController.updateVendor);

// Delete a vendor by ID
router.delete('/:id', vendorController.deleteVendor);

module.exports = router;

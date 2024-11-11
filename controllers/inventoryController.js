const inventoryService = require('../services/inventoryService');
const xlsx = require('xlsx');

// Create a new inventory item
const createInventoryItem = async (req, res) => {
    try {
        const result = await inventoryService.createInventoryItem(req.body);
        res.status(201).json({ message: "Inventory item created successfully.", inventoryId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error creating inventory item.", error });
    }
};

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
    try {
        const rows = await inventoryService.getAllInventoryItems();
        res.status(200).json({ message: "Inventory items retrieved successfully.", data: rows });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory items.", error });
    }
};

// Get an inventory item by ID
const getInventoryItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await inventoryService.getInventoryItemById(id);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Inventory item not found." });
        }
        res.status(200).json({ message: "Inventory item retrieved successfully.", data: rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory item.", error });
    }
};

// Update an inventory item by ID
const updateInventoryItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await inventoryService.updateInventoryItem(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Inventory item not found." });
        }
        res.status(200).json({ message: "Inventory item updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating inventory item.", error });
    }
};

// Delete an inventory item by ID
const deleteInventoryItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await inventoryService.deleteInventoryItem(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Inventory item not found." });
        }
        res.status(200).json({ message: "Inventory item deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting inventory item.", error });
    }
};
// Handle the Excel file upload and parse the data
const uploadInventoryExcel = async (req, res) => {
    try {
        // Check if the file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read the uploaded Excel file
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet contains the data
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON format
        const inventoryItems = xlsx.utils.sheet_to_json(sheet);

        // Iterate through each inventory item and insert it into the database
        for (const itemData of inventoryItems) {
            await inventoryService.createInventoryItem(itemData);
        }

        res.status(201).json({ message: 'Inventory items uploaded and added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload inventory items: ' + error.message });
    }
};
// In-stock (Add to stock)
const addStock = async (req, res) => {
    const { id } = req.params;
    const { quantity, notes } = req.body;

    try {
        const result = await inventoryService.inStock(id, quantity, notes);
        res.json({ message: 'Stock updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Out-stock (Remove from stock)
const removeStock = async (req, res) => {
    const { id } = req.params;
    const { quantity, notes } = req.body;

    try {
        const result = await inventoryService.outStock(id, quantity, notes);
        res.json({ message: 'Stock updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem,
    uploadInventoryExcel,
    addStock, removeStock
};

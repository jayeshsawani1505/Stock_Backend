const inventoryService = require('../services/inventoryService');

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

module.exports = {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem
};

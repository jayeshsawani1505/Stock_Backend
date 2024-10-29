const purchasesService = require('../services/purchasesService');

// Create a new purchase
const createPurchase = async (req, res) => {
    try {
        const result = await purchasesService.createPurchase(req.body);
        res.status(201).json({ message: "Purchase created successfully.", purchaseId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error creating purchase.", error });
    }
};

// Get all purchases
const getAllPurchases = async (req, res) => {
    try {
        const rows = await purchasesService.getAllPurchases();
        res.status(200).json({ message: "Purchases retrieved successfully.", data: rows });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving purchases.", error });
    }
};

// Get a purchase by ID
const getPurchaseById = async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await purchasesService.getPurchaseById(id);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Purchase not found." });
        }
        res.status(200).json({ message: "Purchase retrieved successfully.", data: rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving purchase.", error });
    }
};

// Update a purchase by ID
const updatePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await purchasesService.updatePurchase(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Purchase not found." });
        }
        res.status(200).json({ message: "Purchase updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating purchase.", error });
    }
};

// Delete a purchase by ID
const deletePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await purchasesService.deletePurchase(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Purchase not found." });
        }
        res.status(200).json({ message: "Purchase deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting purchase.", error });
    }
};

module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
};

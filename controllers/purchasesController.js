const purchasesService = require('../services/purchasesService');
const xlsx = require('xlsx');

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

const uploadPurchasesExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read the uploaded Excel file
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the Excel sheet to JSON format
        const purchases = xlsx.utils.sheet_to_json(worksheet);

        // Loop through the JSON data and insert each purchase record into the database
        for (const purchase of purchases) {
            const purchaseData = {
                vendor_id: purchase.vendor_id,
                purchase_date: purchase.purchase_date,
                due_date: purchase.due_date,
                reference_no: purchase.reference_no,
                supplier_invoice_serial_no: purchase.supplier_invoice_serial_no,
                product_id: purchase.product_id,
                quantity: purchase.quantity,
                rate: purchase.rate,
                notes: purchase.notes || '',
                terms_conditions: purchase.terms_conditions || '',
                total_amount: purchase.total_amount,
                payment_mode: purchase.payment_mode,
                status: purchase.status || 'pending'
            };

            // Insert each purchase record using the service function
            await purchasesService.createPurchaseExcel(purchaseData);
        }

        res.status(201).json({ message: 'Purchases uploaded and created successfully' });
    } catch (error) {
        console.error('Error uploading purchases:', error);
        res.status(500).json({ message: 'Failed to upload purchases: ' + error.message });
    }
};

const getFilteredPurchases = async (req, res) => {
    try {
        const filters = req.query; // Get query parameters from the request
        const response = await purchasesService.getFilteredPurchases(filters);

        if (response.success) {
            res.status(200).json({ message: "Purchases retrieved successfully.", data: response.data });
        } else {
            res.status(404).json({ message: response.message });
        }
    } catch (error) {
        console.error("Error in getFilteredPurchases controller:", error);
        res.status(500).json({ message: "Error retrieving purchases.", error });
    }
};

const updatePurchasesStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Status is required." });
    }

    try {
        const result = await purchasesService.updatePurchasesStatus(id, status);
        res.status(200).json({ message: "Purchases status updated successfully.", data: result });
    } catch (error) {
        if (error.message === 'Purchases not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Error updating Purchases status.", error: error.message });
    }
};

module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
    uploadPurchasesExcel,
    getFilteredPurchases,
    updatePurchasesStatus
};

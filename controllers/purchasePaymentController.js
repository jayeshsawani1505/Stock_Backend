const purchasePaymentService = require('../services/purchasePayementService');

// Create a new purchase payment
const createPurchasePayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const result = await purchasePaymentService.createPurchasePaymentService(paymentData);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error in createPurchasePayment:", error);
        res.status(500).json({ error: "Failed to create purchase payment" });
    }
};

// Get a purchase payment by ID
const getPurchasePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await purchasePaymentService.getPurchasePaymentService(id);
        if (!result) {
            return res.status(404).json({ error: "Purchase payment not found" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error in getPurchasePayment:", error);
        res.status(500).json({ error: "Failed to fetch purchase payment" });
    }
};

// Get all purchase payments
const getPurchasePayments = async (req, res) => {
    try {
        const result = await purchasePaymentService.getPurchasePaymentsService();
        res.json(result);
    } catch (error) {
        console.error("Error in getPurchasePayments:", error);
        res.status(500).json({ error: "Failed to fetch purchase payments" });
    }
};

// Update a purchase payment by ID
const updatePurchasePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentData = req.body;
        const result = await purchasePaymentService.updatePurchasePaymentService(id, paymentData);
        if (!result) {
            return res.status(404).json({ error: "Purchase payment not found" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error in updatePurchasePayment:", error);
        res.status(500).json({ error: "Failed to update purchase payment" });
    }
};

// Delete a purchase payment by ID
const deletePurchasePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await purchasePaymentService.deletePurchasePaymentService(id);
        if (!result) {
            return res.status(404).json({ error: "Purchase payment not found" });
        }
        res.json({ message: "Purchase payment deleted successfully" });
    } catch (error) {
        console.error("Error in deletePurchasePayment:", error);
        res.status(500).json({ error: "Failed to delete purchase payment" });
    }
};

// Get purchase payments by purchase ID
const getPurchasePaymentsByPurchaseId = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        const result = await purchasePaymentService.getPurchasePaymentsByPurchaseIdService(purchaseId);
        res.json(result);
    } catch (error) {
        console.error("Error in getPurchasePaymentsByPurchaseId:", error);
        res.status(500).json({ error: "Failed to fetch purchase payments by purchase ID" });
    }
};

// Get filtered purchase payments
const getFilteredPurchasePayments = async (req, res) => {
    try {
        const filters = req.query;
        const result = await purchasePaymentService.getFilteredPurchasePaymentsService(filters);
        res.json(result);
    } catch (error) {
        console.error("Error in getFilteredPurchasePayments:", error);
        res.status(500).json({ error: "Failed to fetch filtered purchase payments" });
    }
};
const getFilteredTransactionLogs = async (req, res) => {
    try {
        const filters = req.query; // Get query parameters (startDate, endDate, customerId, transactionType)
        const results = await purchasePaymentService.getFilteredVendorTransactionLogsService(filters);

        if (results.length === 0) {
            return res.status(404).json({ message: "No transaction logs found." });
        }

        res.status(200).json({ message: "Transaction logs retrieved successfully.", data: results });
    } catch (error) {
        console.error("Error in getFilteredTransactionLogs controller:", error);
        res.status(500).json({ message: "Error retrieving transaction logs.", error });
    }
};

module.exports = {
    createPurchasePayment,
    getPurchasePayment,
    getPurchasePayments,
    updatePurchasePayment,
    deletePurchasePayment,
    getPurchasePaymentsByPurchaseId,
    getFilteredPurchasePayments,
    getFilteredTransactionLogs
};

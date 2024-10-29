const invoiceService = require('../services/invoiceService');

// Create a new invoice
const createInvoice = async (req, res) => {
    try {
        const result = await invoiceService.createInvoice(req.body);
        res.status(201).json({ message: "Invoice created successfully.", invoiceId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error creating invoice.", error });
    }
};

// Get all invoices
const getAllInvoices = async (req, res) => {
    try {
        const rows = await invoiceService.getAllInvoices();
        res.status(200).json({ message: "Invoices retrieved successfully.", data: rows });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving invoices.", error });
    }
};

// Get an invoice by ID
const getInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await invoiceService.getInvoiceById(id);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Invoice not found." });
        }
        res.status(200).json({ message: "Invoice retrieved successfully.", data: rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving invoice.", error });
    }
};

// Update an invoice by ID
const updateInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await invoiceService.updateInvoice(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Invoice not found." });
        }
        res.status(200).json({ message: "Invoice updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating invoice.", error });
    }
};

// Delete an invoice by ID
const deleteInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await invoiceService.deleteInvoice(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Invoice not found." });
        }
        res.status(200).json({ message: "Invoice deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting invoice.", error });
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};

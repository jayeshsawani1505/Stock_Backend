const creditNoteInvoiceService = require('../services/creditNoteInvoiceService');

// Create a new credit note invoice
const createCreditNoteInvoice = async (req, res) => {
    try {
        const invoiceData = req.body;
        const result = await creditNoteInvoiceService.createCreditNoteInvoiceService(invoiceData);
        res.status(201).json({ message: 'Credit note invoice created successfully', invoiceId: result.invoiceId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create credit note invoice: ' + error.message });
    }
};

// Get a credit note invoice by ID
const getCreditNoteInvoiceById = async (req, res) => {
    try {
        const id = req.params.id;
        const invoice = await creditNoteInvoiceService.getCreditNoteInvoiceService(id);
        if (!invoice) return res.status(404).json({ message: 'Credit note invoice not found' });
        res.status(200).json({ message: 'Credit note invoice retrieved successfully', invoice });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve credit note invoice: ' + error.message });
    }
};

// Get all credit note invoices
const getAllCreditNoteInvoices = async (req, res) => {
    try {
        const invoices = await creditNoteInvoiceService.getCreditNoteInvoicesService();
        res.status(200).json({ message: 'Credit note invoices retrieved successfully', invoices });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve credit note invoices: ' + error.message });
    }
};

// Update a credit note invoice by ID
const updateCreditNoteInvoice = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await creditNoteInvoiceService.updateCreditNoteInvoiceService(id, updatedData);
        if (!result) return res.status(404).json({ message: 'Credit note invoice not found' });
        res.status(200).json({ message: 'Credit note invoice updated successfully', invoice: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update credit note invoice: ' + error.message });
    }
};

// Delete a credit note invoice by ID
const deleteCreditNoteInvoice = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await creditNoteInvoiceService.deleteCreditNoteInvoiceService(id);
        if (!deleted) return res.status(404).json({ message: 'Credit note invoice not found' });
        res.status(200).json({ message: 'Credit note invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete credit note invoice: ' + error.message });
    }
};

module.exports = {
    createCreditNoteInvoice,
    getCreditNoteInvoiceById,
    getAllCreditNoteInvoices,
    updateCreditNoteInvoice,
    deleteCreditNoteInvoice
};

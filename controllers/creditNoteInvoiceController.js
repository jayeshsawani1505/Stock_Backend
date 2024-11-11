const creditNoteInvoiceService = require('../services/creditNoteInvoiceService');
const xlsx = require('xlsx');

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

// Upload and process Excel file to create multiple credit note invoices
const uploadCreditNoteInvoicesExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read the Excel file
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const creditNotes = xlsx.utils.sheet_to_json(sheet);

        // Loop through each entry and create a credit note invoice
        for (const creditNoteData of creditNotes) {
            await creditNoteInvoiceService.createCreditNoteInvoiceService(creditNoteData);
        }

        res.status(201).json({ message: 'Credit note invoices uploaded and created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload credit note invoices: ' + error.message });
    }
};

module.exports = {
    createCreditNoteInvoice,
    getCreditNoteInvoiceById,
    getAllCreditNoteInvoices,
    updateCreditNoteInvoice,
    deleteCreditNoteInvoice,
    uploadCreditNoteInvoicesExcel
};

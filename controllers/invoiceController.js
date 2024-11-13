const invoiceService = require('../services/invoiceService');
const xlsx = require('xlsx');

// Create a new invoice
const createInvoice = async (req, res) => {
    try {
        const result = await invoiceService.createInvoice(req.body);
        res.status(201).json({ message: "Invoice created successfully.", invoiceId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error creating invoice.", error });
    }
};

// Get generate InvoiceNumber
const generateInvoiceNumber = async (req, res) => {
    try {
        // Call the service to generate a new invoice number
        const newInvoiceNumber = await invoiceService.generateInvoiceNumber();

        // Send the response with the generated invoice number
        res.status(200).json({
            message: "Invoice number generated successfully.",
            data: { invoice_number: newInvoiceNumber }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error generating invoice number.",
            error: error.message
        });
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

const getTotalInvoiceCount = async (req, res) => {
    try {
        const totalInvoice = await invoiceService.getTotalInvoiceCount();

        res.status(200).json({
            message: "Total invoice count fetched successfully",
            totalInvoice
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch total invoice count",
            error: error.message
        });
    }
};

const getInvoiceTotalsByStatus = async (req, res) => {
    try {
        const totals = await invoiceService.getTotalAmountsByStatus();

        // Send the result as a JSON response with a message and status code
        res.status(200).json({
            message: "Total amounts by status retrieved successfully.",
            data: totals
        });
    } catch (error) {
        console.error("Error in getInvoiceTotalsByStatus:", error);

        // Send a 500 error response with an error message and status code
        res.status(500).json({
            message: "An error occurred while retrieving invoice totals by status.",
            status: 500,
            error: error.message
        });
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

// Get Invoice details by id for pdf
const getInvoiceDetailsForPDF = async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await invoiceService.getInvoiceDetailsForPDF(id);
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

// API to upload and process Excel file for invoices
const uploadExcel = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Loop through the data and insert each invoice record
        for (const row of jsonData) {
            const invoiceData = {
                invoice_number: row.invoice_number,
                customer_id: row.customer_id,
                invoice_date: row.invoice_date,
                due_date: row.due_date,
                reference_number: row.reference_number,
                status: row.status,
                recurring: row.recurring,
                recurring_cycle: row.recurring_cycle,
                product_id: row.product_id,
                quantity: row.quantity,
                unit: row.unit,
                rate: row.rate,
                bank_id: row.bank_id,
                notes: row.notes,
                terms_conditions: row.terms_conditions,
                total_amount: row.total_amount,
            };

            // Call the service function to insert the data into the database
            await invoiceService.createInvoice(invoiceData);
        }

        res.status(200).json({ message: 'Invoices uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process the Excel file' });
    }
};

module.exports = {
    generateInvoiceNumber,
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    uploadExcel,
    getInvoiceTotalsByStatus,
    getTotalInvoiceCount,
    getInvoiceDetailsForPDF
};

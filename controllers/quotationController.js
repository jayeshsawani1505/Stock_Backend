const quotationService = require('../services/quotationService');

// Create a new quotation
const createQuotation = async (req, res) => {
    try {
        const quotationData = req.body;
        const result = await quotationService.createQuotationService(quotationData);
        res.status(201).json({ message: 'Quotation created successfully', quotationId: result.quotationId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create quotation: ' + error.message });
    }
};

// Get a quotation by ID
const getQuotationById = async (req, res) => {
    try {
        const quotation = await quotationService.getQuotationService(req.params.id);
        if (!quotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }
        res.status(200).json({ message: 'Quotation retrieved successfully', quotation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve quotation: ' + error.message });
    }
};

// Get all quotations
const getAllQuotations = async (req, res) => {
    try {
        const quotations = await quotationService.getQuotationsService();
        res.status(200).json({ message: 'Quotations retrieved successfully', quotations });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve quotations: ' + error.message });
    }
};

// Update a quotation
const updateQuotation = async (req, res) => {
    try {
        const updatedQuotation = await quotationService.updateQuotationService(req.params.id, req.body);
        if (!updatedQuotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }
        res.status(200).json({ message: 'Quotation updated successfully', quotation: updatedQuotation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update quotation: ' + error.message });
    }
};

// Delete a quotation
const deleteQuotation = async (req, res) => {
    try {
        const deleted = await quotationService.deleteQuotationService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Quotation not found' });
        }
        res.status(200).json({ message: 'Quotation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete quotation: ' + error.message });
    }
};
// Get quotations by customer ID
const getQuotationsByCustomerId = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const quotations = await quotationService.getQuotationsByCustomerIdService(customerId);
        if (quotations.length === 0) {
            return res.status(404).json({ message: 'No quotations found for this customer' });
        }
        res.status(200).json({ message: 'Quotations retrieved successfully', quotations });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve quotations: ' + error.message });
    }
};
module.exports = {
    createQuotation,
    getQuotationById,
    getAllQuotations,
    updateQuotation,
    deleteQuotation,
    getQuotationsByCustomerId
};

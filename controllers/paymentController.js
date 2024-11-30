const paymentService = require('../services/paymentService');

const createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPaymentService(req.body);
        res.status(201).json({
            message: 'Payment created successfully',
            payment
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create payment: ' + error.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentService(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({
            message: 'Payment retrieved successfully',
            payment
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payment: ' + error.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getPaymentsService();
        res.status(200).json({
            message: 'Payments retrieved successfully',
            payments
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payments: ' + error.message });
    }
};

const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await paymentService.updatePaymentService(req.params.id, req.body);
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({
            message: 'Payment updated successfully',
            updatedPayment
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update payment: ' + error.message });
    }
};

const deletePayment = async (req, res) => {
    try {
        const deleted = await paymentService.deletePaymentService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(204).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete payment: ' + error.message });
    }
};

const getPaymentsByCustomerId = async (req, res) => {
    try {
        const payments = await paymentService.getPaymentsByCustomerIdService(req.params.customerId);
        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this customer ID' });
        }
        res.status(200).json({ 
            message: 'Payments retrieved successfully', 
            payments 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payments: ' + error.message });
    }
};

const getFilteredPayments = async (req, res) => {
    try {
        const filters = req.query; // Get query parameters (startDate, endDate, customerId)
        const results = await paymentService.getFilteredPaymentsService(filters);

        if (results.length === 0) {
            return res.status(404).json({ message: "No payments found." });
        }

        res.status(200).json({ message: "Payments retrieved successfully.", data: results });
    } catch (error) {
        console.error("Error in getFilteredPayments controller:", error);
        res.status(500).json({ message: "Error retrieving payments.", error });
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment,
    getPaymentsByCustomerId,
    getFilteredPayments
};

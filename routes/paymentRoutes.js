const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment
router.post('/', paymentController.createPayment);

// Get all payments
router.get('/', paymentController.getAllPayments);

// Get a payment by ID
router.get('/:id', paymentController.getPaymentById);

// Update a payment by ID
router.put('/:id', paymentController.updatePayment);

// Delete a payment by ID
router.delete('/:id', paymentController.deletePayment);

router.get('/customer/:customerId', paymentController.getPaymentsByCustomerId);

router.get('/report/filter', paymentController.getFilteredPayments);
router.get('/transaction/report/filter', paymentController.getFilteredTransactionLogs);

module.exports = router;

const dbconnection = require('../config/database');

// Create a new payment
const createPaymentService = async (paymentData) => {
    const { customer_id, amount, payment_mode, payment_date, payment_status, description } = paymentData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO payments (customer_id, amount, payment_mode, payment_date, payment_status, description) VALUES (?, ?, ?, ?, ?, ?)',
            [customer_id, amount, payment_mode, payment_date, payment_status, description],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { paymentId: result.insertId };
};

// Get a payment by ID
const getPaymentService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM payments WHERE payment_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all payments
const getPaymentsService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM payments',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a payment by ID
const updatePaymentService = async (id, paymentData) => {
    const { customer_id, amount, payment_mode, payment_date, payment_status, description } = paymentData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE payments SET customer_id = ?, amount = ?, payment_mode = ?, payment_date = ?, payment_status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE payment_id = ?',
            [customer_id, amount, payment_mode, payment_date, payment_status, description, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...paymentData } : null;
};

// Delete a payment by ID
const deletePaymentService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM payments WHERE payment_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0;
};
// Get payments by customer ID
const getPaymentsByCustomerIdService = async (customerId) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM payments WHERE customer_id = ?',
            [customerId],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

module.exports = {
    createPaymentService,
    getPaymentService,
    getPaymentsService,
    updatePaymentService,
    deletePaymentService,
    getPaymentsByCustomerIdService
};

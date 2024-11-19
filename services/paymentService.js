const dbconnection = require('../config/database');

// Create a new payment
const createPaymentService = async (paymentData) => {
    const { invoice_id, amount, payment_mode, payment_date, payment_status, description } = paymentData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO payments (invoice_id, amount, payment_mode, payment_date, payment_status, description) VALUES (?, ?, ?, ?, ?, ?)',
            [invoice_id, amount, payment_mode, payment_date, payment_status, description],
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
            `SELECT payments.*, invoices.*, customers.name AS customer_name
             FROM payments
             JOIN invoices ON payments.invoice_id = invoices.id
             JOIN customers ON invoices.customer_id = customers.customer_id
             ORDER BY payments.created_at DESC`,
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
    const { invoice_id, amount, payment_mode, payment_date, payment_status, description } = paymentData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE payments SET invoice_id = ?, amount = ?, payment_mode = ?, payment_date = ?, payment_status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE payment_id = ?',
            [invoice_id, amount, payment_mode, payment_date, payment_status, description, id],
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
// Get payments by invoice ID
const getPaymentsByCustomerIdService = async (customerId) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM payments WHERE invoice_id = ?',
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

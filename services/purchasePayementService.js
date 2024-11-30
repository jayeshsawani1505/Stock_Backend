const dbconnection = require('../config/database');

// Create a new purchase payment
const createPurchasePaymentService = async (paymentData) => {
    const { purchase_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description } = paymentData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO purchase_payments (purchase_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [purchase_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { paymentId: result.insertId };
};

// Get a purchase payment by ID
const getPurchasePaymentService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM purchase_payments WHERE payment_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all purchase payments
const getPurchasePaymentsService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            `SELECT purchase_payments.*, purchases.*, suppliers.name AS supplier_name
                FROM purchase_payments
                JOIN purchases ON purchase_payments.purchase_id = purchases.id
                JOIN suppliers ON purchases.supplier_id = suppliers.supplier_id
                ORDER BY purchase_payments.created_at DESC`,
            async (error, results) => {
                if (error) return reject(error);
                else resolve(results);
            }
        );
    });

    return rows;
};

// Update a purchase payment by ID
const updatePurchasePaymentService = async (id, paymentData) => {
    const { purchase_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description } = paymentData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE purchase_payments SET purchase_id = ?, receiveAmount = ?, pendingAmount = ?, payment_mode = ?, payment_date = ?, payment_status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE payment_id = ?',
            [purchase_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...paymentData } : null;
};

// Delete a purchase payment by ID
const deletePurchasePaymentService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM purchase_payments WHERE payment_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0;
};

// Get purchase payments by purchase ID
const getPurchasePaymentsByPurchaseIdService = async (purchaseId) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM purchase_payments WHERE purchase_id = ?',
            [purchaseId],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Get filtered purchase payments
const getFilteredPurchasePaymentsService = async (filters) => {
    try {
        const { startDate, endDate, supplierId } = filters;

        let query = `
                SELECT purchase_payments.*, purchases.*, suppliers.name AS supplier_name
                FROM purchase_payments
                JOIN purchases ON purchase_payments.purchase_id = purchases.id
                JOIN suppliers ON purchases.supplier_id = suppliers.supplier_id
            `;

        const conditions = [];
        const values = [];

        if (startDate) {
            conditions.push("purchase_payments.created_at >= ?");
            values.push(startDate);
        }

        if (endDate) {
            conditions.push("purchase_payments.created_at <= ?");
            values.push(endDate);
        }

        if (supplierId) {
            conditions.push("purchases.supplier_id = ?");
            values.push(supplierId);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += ` ORDER BY purchase_payments.created_at DESC`;

        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(query, values, async (error, results) => {
                if (error) return reject(error);

                else resolve(results);
            });
        });

        return rows;
    } catch (error) {
        console.error("Error in getFilteredPurchasePaymentsService:", error);
        throw error;
    }
};

module.exports = {
    createPurchasePaymentService,
    getPurchasePaymentService,
    getPurchasePaymentsService,
    updatePurchasePaymentService,
    deletePurchasePaymentService,
    getPurchasePaymentsByPurchaseIdService,
    getFilteredPurchasePaymentsService
};

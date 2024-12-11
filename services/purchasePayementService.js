const dbconnection = require('../config/database');

// Create a new purchase payment
const createPurchasePaymentService = async (paymentData) => {
    const { vendor_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description } = paymentData;

    return new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO purchase_payments 
             (vendor_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [vendor_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description],
            async (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return reject({ message: 'Error creating payment.', error });
                }

                try {

                    await updateVendorClosingBalance(vendor_id, receiveAmount);

                    // Log the transaction in the transaction_logs table
                    await logTransaction(vendor_id, receiveAmount);

                    // Resolve with the inserted payment ID
                    resolve({ paymentId: results.insertId });
                } catch (balanceError) {
                    console.error('Transaction log error:', balanceError);
                    return reject({ message: 'Transaction log failed.', balanceError });
                }
            }
        );
    });
};

const logTransaction = async (vendor_id, receiveAmount) => {
    return new Promise((resolve, reject) => {
        // Fetch the vendor's current closing balance
        dbconnection.query(
            `SELECT closing_balance FROM vendors WHERE vendor_id = ?`,
            [vendor_id],
            (error, results) => {
                if (error) {
                    return reject(new Error(`Failed to fetch closing balance: ${error.message}`));
                }

                if (results.length === 0) {
                    return reject(new Error(`Vendor with ID ${vendor_id} not found.`));
                }

                const currentBalance = results[0].closing_balance;
                const balanceAfter = currentBalance - receiveAmount;  // Subtract the payment amount

                // Insert the transaction log
                dbconnection.query(
                    `INSERT INTO vendor_transaction_logs (vendor_id, transaction_type, amount, balance_after) 
                    VALUES (?, 'payment-in', ?, ?)`,
                    [vendor_id, receiveAmount, balanceAfter],
                    (error, logResults) => {
                        if (error) {
                            return reject(new Error(`Failed to insert transaction log: ${error.message}`));
                        }

                        // Resolve with the transaction log details
                        resolve({ vendor_id, balanceAfter });
                    }
                );
            }
        );
    });
};

const updateVendorClosingBalance = async (vendor_id, receiveAmount) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            `UPDATE vendors 
             SET 
                 vendors.opening_balance = vendors.opening_balance - ?, 
                 vendors.closing_balance = vendors.closing_balance - ?
             WHERE vendors.vendor_id = ?`,
            [receiveAmount, receiveAmount, vendor_id], // Pass three values
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('Customer or Invoice not found'));
                }
                resolve(results);
            }
        );
    });
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
    try {
        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(
                `
                SELECT 
                    purchase_payments.*, 
                    vendors.vendor_name,
                    COALESCE(SUM(purchases.total_amount), 0) AS total_purchase_amount
                FROM 
                    purchase_payments
                JOIN 
                    vendors ON purchase_payments.vendor_id = vendors.vendor_id
                LEFT JOIN 
                    purchases ON vendors.vendor_id = purchases.vendor_id
                GROUP BY 
                    purchase_payments.payment_id, 
                    vendors.vendor_id
                ORDER BY 
                    purchase_payments.created_at DESC;
                `,
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
        return rows;
    } catch (error) {
        console.error("Error fetching purchase payments:", error);
        throw error;
    }
};

// Update a purchase payment by ID
const updatePurchasePaymentService = async (id, paymentData) => {
    const { vendor_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description } = paymentData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE purchase_payments SET vendor_id = ?, receiveAmount = ?, pendingAmount = ?, payment_mode = ?, payment_date = ?, payment_status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE payment_id = ?',
            [vendor_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description, id],
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
            'SELECT * FROM purchase_payments WHERE vendor_id = ?',
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
        const { startDate, endDate, vendorid } = filters;

        let query = `
                SELECT 
                    purchase_payments.*, 
                    vendors.vendor_name,
                    COALESCE(SUM(purchases.total_amount), 0) AS total_purchase_amount
                FROM 
                    purchase_payments
                JOIN 
                    vendors ON purchase_payments.vendor_id = vendors.vendor_id
                LEFT JOIN 
                    purchases ON vendors.vendor_id = purchases.vendor_id
                GROUP BY 
                    purchase_payments.payment_id, 
                    vendors.vendor_id
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

        if (vendorid) {
            conditions.push("purchase_payments.vendor_id = ?");
            values.push(vendorid);
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

const getFilteredVendorTransactionLogsService = async (filters) => {
    try {
        const { startDate, endDate, vendorId, transactionType } = filters;

        // Base SQL query
        let query = `
            SELECT 
                vendor_transaction_logs.*, 
                vendors.vendor_name AS vendor_name
            FROM 
                vendor_transaction_logs
            JOIN 
                vendors ON vendor_transaction_logs.vendor_id = vendors.vendor_id
        `;

        const conditions = [];
        const values = [];

        if (startDate) {
            conditions.push("vendor_transaction_logs.created_at >= ?");
            values.push(startDate);
        }

        if (endDate) {
            conditions.push("vendor_transaction_logs.created_at <= ?");
            values.push(endDate);
        }

        if (vendorId) {
            conditions.push("vendor_transaction_logs.vendor_id = ?");
            values.push(vendorId);
        }

        if (transactionType) {
            conditions.push("vendor_transaction_logs.transaction_type = ?");
            values.push(transactionType);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += `
            ORDER BY 
                vendor_transaction_logs.created_at ASC
        `;

        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(query, values, async (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        return rows;
    } catch (error) {
        console.error("Error in getFilteredVendorTransactionLogsService:", error);
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
    getFilteredPurchasePaymentsService,
    getFilteredVendorTransactionLogsService
};

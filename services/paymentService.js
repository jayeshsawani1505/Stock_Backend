const dbconnection = require('../config/database');

// Create a new payment
const createPaymentService = async (paymentData) => {
    const {
        customer_id,
        receiveAmount,
        pendingAmount,
        payment_mode,
        payment_date,
        payment_status,
        description
    } = paymentData;

    return new Promise(async (resolve, reject) => {
        try {
            // Start transaction
            await dbconnection.beginTransaction();

            // Insert payment record
            const paymentResult = await new Promise((resolve, reject) => {
                dbconnection.query(
                    'INSERT INTO payments (customer_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [customer_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description],
                    (error, results) => {
                        if (error) reject(error);
                        else resolve(results);
                    }
                );
            });

            const paymentId = paymentResult.insertId;

            // Update customer's closing balance
            await updateCustomerClosingBalance(customer_id, receiveAmount);

            // Log the transaction in the transaction_logs table
            await logTransaction(customer_id, receiveAmount, payment_date);

            // Commit transaction
            await dbconnection.commit();

            resolve({ paymentId });
        } catch (error) {
            // Rollback transaction in case of failure
            await dbconnection.rollback();
            reject(error);
        }
    });
};

const updateCustomerClosingBalance = async (customer_id, receiveAmount) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            `UPDATE customers 
             SET 
                 customers.opening_balance = customers.opening_balance - ?, 
                 customers.closing_balance = customers.closing_balance - ?
             WHERE customers.customer_id = ?`,
            [receiveAmount, receiveAmount, customer_id], // Pass three values
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

const logTransaction = async (customer_id, receiveAmount, payment_date) => {
    return new Promise((resolve, reject) => {
        // Fetch the customer's current closing balance
        dbconnection.query(
            `SELECT closing_balance FROM customers WHERE customer_id = ?`,
            [customer_id],
            (error, results) => {
                if (error) {
                    return reject(new Error(`Failed to fetch closing balance: ${error.message}`));
                }

                if (results.length === 0) {
                    return reject(new Error(`Customer with ID ${customer_id} not found.`));
                }

                const currentBalance = results[0].closing_balance;

                // Insert the transaction log
                dbconnection.query(
                    `INSERT INTO transaction_logs (customer_id, transaction_type, amount, balance_after, payment_date) 
                    VALUES (?, 'payment-in', ?, ?, ?)`,
                    [customer_id, receiveAmount, currentBalance, payment_date],
                    (error, logResults) => {
                        if (error) {
                            return reject(new Error(`Failed to insert transaction log: ${error.message}`));
                        }

                        // Resolve with the transaction log details
                        resolve({ customer_id, currentBalance });
                    }
                );
            }
        );
    });
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
    try {
        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(
                `SELECT 
                payments.*, 
                 customers.name AS customer_name,
                 customers.opening_balance AS customer_opening_balance,
                 customers.closing_balance AS customer_closing_balance,
                 COALESCE(SUM(invoices.total_amount), 0) AS total_invoice_amount
                FROM 
                    payments
                JOIN 
                    customers ON payments.customer_id = customers.customer_id
                LEFT JOIN 
                    invoices ON customers.customer_id = invoices.customer_id
                GROUP BY 
                    payments.payment_id, 
                    customers.customer_id
                ORDER BY 
                    payments.created_at DESC
                `,
                (error, results) => {
                    if (error) {
                        return reject(error); // Reject if there's an error
                    }
                    resolve(results); // Resolve the query results
                }
            );
        });
        return rows; // Return the rows after the promise resolves
    } catch (error) {
        console.error("Error fetching payments:", error.message);
        throw new Error("Failed to fetch payments. Please try again later.");
    }
};

// Update a payment by ID
const updatePaymentService = async (id, paymentData) => {
    const { customer_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description } = paymentData;

    // Update payment record
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE payments SET customer_id = ?, receiveAmount = ?, pendingAmount = ?, payment_mode = ?, payment_date = ?, payment_status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE payment_id = ?',
            [customer_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });

    // If payment was successfully updated, update the customer's closing balance
    if (result.affectedRows > 0) {
        try {
            await updateCustomerClosingBalance(customer_id, receiveAmount);
            await logTransaction(customer_id, receiveAmount);
        } catch (error) {
            console.error('Error updating customer closing balance:', error);
            throw new Error('Payment updated, but failed to update customer closing balance.');
        }
        return { id, ...paymentData };
    }

    return null;
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

const getFilteredPaymentsService = async (filters) => {
    try {
        const { startDate, endDate, customerId } = filters;

        // Base SQL query
        let query = `
            SELECT 
                payments.*, 
                customers.name AS customer_name,
                customers.opening_balance AS customer_opening_balance,
                customers.closing_balance AS customer_closing_balance,
                COALESCE(SUM(invoices.total_amount), 0) AS total_invoice_amount
            FROM 
                payments
            JOIN 
                customers ON payments.customer_id = customers.customer_id
            LEFT JOIN 
                invoices ON customers.customer_id = invoices.customer_id
        `;

        const conditions = [];
        const values = [];

        if (startDate) {
            conditions.push("payments.created_at >= ?");
            values.push(startDate);
        }

        if (endDate) {
            conditions.push("payments.created_at <= ?");
            values.push(endDate);
        }

        if (customerId) {
            conditions.push("customers.customer_id = ?");
            values.push(customerId);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += `
            GROUP BY 
                payments.payment_id, 
                customers.customer_id
            ORDER BY 
                payments.created_at DESC
        `;

        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(query, values, async (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        return rows;
    } catch (error) {
        console.error("Error in getFilteredPaymentsService:", error);
        throw error;
    }
};

const getFilteredTransactionLogsService = async (filters) => {
    try {
        const { startDate, endDate, customerId, transactionType } = filters;

        // Base SQL query
        let query = `
            SELECT 
                transaction_logs.*, 
                customers.name AS customer_name
            FROM 
                transaction_logs
            JOIN 
                customers ON transaction_logs.customer_id = customers.customer_id
        `;

        const conditions = [];
        const values = [];

        if (startDate) {
            conditions.push("transaction_logs.created_at >= ?");
            values.push(startDate);
        }

        if (endDate) {
            conditions.push("transaction_logs.created_at <= ?");
            values.push(endDate);
        }

        if (customerId) {
            conditions.push("transaction_logs.customer_id = ?");
            values.push(customerId);
        }

        if (transactionType) {
            conditions.push("transaction_logs.transaction_type = ?");
            values.push(transactionType);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += `
            ORDER BY 
                transaction_logs.created_at ASC
        `;

        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(query, values, async (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        return rows;
    } catch (error) {
        console.error("Error in getFilteredTransactionLogsService:", error);
        throw error;
    }
};

module.exports = {
    createPaymentService,
    getPaymentService,
    getPaymentsService,
    updatePaymentService,
    deletePaymentService,
    getPaymentsByCustomerIdService,
    getFilteredPaymentsService,
    getFilteredTransactionLogsService
};

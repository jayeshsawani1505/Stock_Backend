const dbconnection = require('../config/database');

// Create a new payment
const createPaymentService = async (paymentData) => {
    const {
        invoice_id,
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
                    'INSERT INTO payments (invoice_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [invoice_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description],
                    (error, results) => {
                        if (error) reject(error);
                        else resolve(results);
                    }
                );
            });

            const paymentId = paymentResult.insertId;

            // Update customer's closing balance
            await updateCustomerClosingBalance(invoice_id, receiveAmount);

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

const updateCustomerClosingBalance = async (invoice_id, receiveAmount) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            `UPDATE customers 
             JOIN invoices ON customers.customer_id = invoices.customer_id
             SET customers.closing_balance = customers.opening_balance - ?
             WHERE invoices.id = ?`,
            [receiveAmount, invoice_id],
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
            async (error, results) => {
                if (error) return reject(error);

                try {
                    for (let payment of results) {
                        let invoiceDetails = [];

                        // Step 1: Parse the `invoice_details` JSON field
                        try {
                            invoiceDetails = JSON.parse(payment.invoice_details || '[]');
                        } catch (err) {
                            return reject(new Error("Invalid invoice_details JSON format"));
                        }

                        if (invoiceDetails.length > 0) {
                            // Step 2: Extract unique product_ids and subproduct_ids
                            const productIds = Array.from(new Set(invoiceDetails.map(d => d.product_id).filter(Boolean)));
                            const subproductIds = Array.from(new Set(invoiceDetails.map(d => d.subproduct_id).filter(Boolean)));

                            if (productIds.length === 0 && subproductIds.length === 0) {
                                // No valid IDs, skip further processing
                                payment.invoice_details = invoiceDetails;
                                continue;
                            }

                            // Step 3: Construct SQL query
                            const detailsQuery = `
                                SELECT 
                                    products.product_id, 
                                    products.product_name, 
                                    subproducts.subproduct_id, 
                                    subproducts.subproduct_name
                                FROM products
                                LEFT JOIN subproducts ON products.product_id = subproducts.product_id
                                WHERE 
                                    (${productIds.length > 0 ? `products.product_id IN (?)` : `1=1`}) 
                                    AND 
                                    (${subproductIds.length > 0 ? `subproducts.subproduct_id IN (?)` : `1=1`})
                            `;

                            // Step 4: Execute the query
                            const detailsResults = await new Promise((resolveDetails, rejectDetails) => {
                                dbconnection.query(
                                    detailsQuery,
                                    [
                                        productIds.length > 0 ? productIds : null,
                                        subproductIds.length > 0 ? subproductIds : null,
                                    ],
                                    (detailsError, detailsRows) => {
                                        if (detailsError) rejectDetails(detailsError);
                                        else resolveDetails(detailsRows);
                                    }
                                );
                            });

                            // Step 5: Map product and subproduct names back to `invoiceDetails`
                            invoiceDetails = invoiceDetails.map(detail => {
                                const product = detailsResults.find(d => d.product_id === detail.product_id) || {};
                                const subproduct = detailsResults.find(d => d.subproduct_id === detail.subproduct_id) || {};

                                return {
                                    ...detail,
                                    product_name: product.product_name || null,
                                    subproduct_name: subproduct.subproduct_name || null,
                                };
                            });
                        }

                        // Step 6: Replace `invoice_details` in the payment
                        payment.invoice_details = invoiceDetails;
                    }

                    resolve(results); // Return enriched results
                } catch (processingError) {
                    reject(processingError);
                }
            }
        );
    });

    return rows;
};

// Update a payment by ID
const updatePaymentService = async (id, paymentData) => {
    const { invoice_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description } = paymentData;

    // Update payment record
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE payments SET invoice_id = ?, receiveAmount = ?, pendingAmount = ?, payment_mode = ?, payment_date = ?, payment_status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE payment_id = ?',
            [invoice_id, receiveAmount, pendingAmount, payment_mode, payment_date, payment_status, description, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });

    // If payment was successfully updated, update the customer's closing balance
    if (result.affectedRows > 0) {
        try {
            await updateCustomerClosingBalance(invoice_id, receiveAmount);
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

const getFilteredPaymentsService = async (filters) => {
    try {
        const { startDate, endDate, customerId } = filters;

        // Base SQL query
        let query = `
             SELECT 
                payments.*, 
                invoices.total_amount, 
                customers.name AS customer_name
            FROM 
                payments
            JOIN 
                invoices ON payments.invoice_id = invoices.id
            JOIN 
                customers ON invoices.customer_id = customers.customer_id
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
            conditions.push("invoices.customer_id = ?");
            values.push(customerId);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += ` ORDER BY payments.created_at DESC`;

        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(query, values, async (error, results) => {
                if (error) return reject(error);

                try {
                    for (let payment of results) {
                        let invoiceDetails = [];

                        // Step 1: Parse the `invoice_details` JSON field
                        try {
                            invoiceDetails = JSON.parse(payment.invoice_details || '[]');
                        } catch (err) {
                            return reject(new Error("Invalid invoice_details JSON format"));
                        }

                        if (invoiceDetails.length > 0) {
                            // Step 2: Extract unique product_ids and subproduct_ids
                            const productIds = Array.from(new Set(invoiceDetails.map(d => d.product_id).filter(Boolean)));
                            const subproductIds = Array.from(new Set(invoiceDetails.map(d => d.subproduct_id).filter(Boolean)));

                            if (productIds.length === 0 && subproductIds.length === 0) {
                                // No valid IDs, skip further processing
                                payment.invoice_details = invoiceDetails;
                                continue;
                            }

                            // Step 3: Construct SQL query to fetch product and subproduct names
                            const detailsQuery = `
                                SELECT 
                                    products.product_id, 
                                    products.product_name, 
                                    subproducts.subproduct_id, 
                                    subproducts.subproduct_name
                                FROM products
                                LEFT JOIN subproducts ON products.product_id = subproducts.product_id
                                WHERE 
                                    (${productIds.length > 0 ? `products.product_id IN (?)` : `1=1`}) 
                                    AND 
                                    (${subproductIds.length > 0 ? `subproducts.subproduct_id IN (?)` : `1=1`})
                            `;

                            // Step 4: Execute the query
                            const detailsResults = await new Promise((resolveDetails, rejectDetails) => {
                                dbconnection.query(
                                    detailsQuery,
                                    [
                                        productIds.length > 0 ? productIds : null,
                                        subproductIds.length > 0 ? subproductIds : null,
                                    ],
                                    (detailsError, detailsRows) => {
                                        if (detailsError) rejectDetails(detailsError);
                                        else resolveDetails(detailsRows);
                                    }
                                );
                            });

                            // Step 5: Map product and subproduct names back to `invoiceDetails`
                            invoiceDetails = invoiceDetails.map(detail => {
                                const product = detailsResults.find(d => d.product_id === detail.product_id) || {};
                                const subproduct = detailsResults.find(d => d.subproduct_id === detail.subproduct_id) || {};

                                return {
                                    ...detail,
                                    product_name: product.product_name || null,
                                    subproduct_name: subproduct.subproduct_name || null,
                                };
                            });
                        }

                        // Step 6: Replace `invoice_details` in the payment
                        payment.invoice_details = invoiceDetails;
                    }

                    resolve(results); // Return enriched results
                } catch (processingError) {
                    reject(processingError);
                }
            });
        });

        return rows;
    } catch (error) {
        console.error("Error in getFilteredPaymentsService:", error);
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
    getFilteredPaymentsService
};

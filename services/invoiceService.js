const dbconnection = require('../config/database');

// Function to generate a unique invoice number
const generateInvoiceNumber = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT MAX(id) AS last_invoice_id FROM invoices', (error, results) => {
            if (error) return reject(error);

            let lastInvoiceId = results[0].last_invoice_id;
            let newInvoiceNumber;

            if (!lastInvoiceId) {
                // Start with the first id (you can adjust this logic as needed)
                newInvoiceNumber = "INV-001";  // The first invoice will have "INV-001"
            } else {
                // Increment the id by 1
                newInvoiceNumber = `INV-${String(lastInvoiceId + 1).padStart(3, '0')}`;
            }

            resolve(newInvoiceNumber);
        });
    });
};

// Get total invoices count
const getTotalInvoiceCount = async () => {
    const count = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT COUNT(*) AS total_invoices FROM invoices', // Get total count of invoices
            (error, results) => {
                if (error) reject(error);
                else resolve(results[0].total_invoices); // Resolving the total count from the first row
            }
        );
    });

    return count;
};

// Create a new invoice
const createInvoice = async (invoiceData) => {
    const { invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, notes, terms_conditions, total_amount, signature_id } = invoiceData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO invoices (invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id,subproduct_id, quantity, unit, rate, notes, terms_conditions, total_amount,signature_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, notes, terms_conditions, total_amount, signature_id],
            async (error, results) => {
                if (error) return reject(error);

                try {
                    if (subproduct_id > 0) {
                        // Call inStock for subproducts
                        await outStockSubProduct(subproduct_id, quantity);
                    } else {
                        // Call outStockProduct for products
                        await outStockProduct(product_id, quantity);
                    }
                } catch (stockError) {
                    return reject(stockError); // Reject if stock update fails
                }

                resolve(results); // Resolve with the original results if everything succeeds
            }
        );
    });
};

// OutStock function for sub product
const outStockSubProduct = async (id, quantity) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE subproducts SET quantity = quantity - ? WHERE subproduct_id = ? AND quantity >= ?',
            [quantity, id, quantity], // Add 'quantity' for the third placeholder
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('Not enough stock available'));
                }
                resolve(results);
            }
        );
    });
};

// OutStock function for product
const outStockProduct = async (id, quantity) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE products SET quantity = quantity - ? WHERE product_id = ? AND quantity >= ?',
            [quantity, id, quantity],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('Not enough stock available'));
                }
                resolve(results);
            }
        );
    });
};

// Get all invoices
const getAllInvoices = async () => {
    return new Promise((resolve, reject) => {
        const query = `
             SELECT 
                invoices.*, 
                category.category_name,
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                customers.profile_photo AS customer_profile_photo
            FROM invoices
            JOIN products ON invoices.product_id = products.product_id
            JOIN category ON products.category_id = category.category_id
            JOIN customers ON invoices.customer_id = customers.customer_id ORDER BY invoices.created_at DESC
        `;

        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get an invoice by ID
const getInvoiceById = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM invoices WHERE id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getInvoiceDetailsForPDF = async (id) => {
    return new Promise((resolve, reject) => {
        const query = `
           SELECT 
            invoices.*, 
            category.category_name,
            products.product_name,
            subproducts.subproduct_name,
            customers.*,
            signature.signature_name,
            signature.signature_photo
        FROM invoices
        JOIN products ON invoices.product_id = products.product_id
        JOIN category ON products.category_id = category.category_id
        JOIN customers ON invoices.customer_id = customers.customer_id
        LEFT JOIN subproducts ON invoices.subproduct_id = subproducts.subproduct_id
        LEFT JOIN signature ON invoices.signature_id = signature.signature_id
        WHERE invoices.id = ?
        `;

        // Query the database
        dbconnection.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);  // Resolve with the query results
        });
    });
};

// Update an invoice by ID
const updateInvoice = async (id, invoiceData) => {
    const { invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_id } = invoiceData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE invoices SET invoice_number = ?, customer_id = ?, invoice_date = ?, due_date = ?, reference_number = ?, status = ?, recurring = ?, recurring_cycle = ?, product_id = ?, subproduct_id = ?, quantity = ?, unit = ?, rate = ?, bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_id, id],
            async (error, results) => {
                if (error) return reject(error);

                try {
                    if (subproduct_id > 0) {
                        // Call inStock for subproducts
                        await outStockSubProduct(subproduct_id, quantity);
                    } else {
                        // Call outStockProduct for products
                        await outStockProduct(product_id, quantity);
                    }
                } catch (stockError) {
                    return reject(stockError); // Reject if stock update fails
                }

                resolve(results); // Resolve with the original results if everything succeeds
            }
        );
    });
};

// Delete an invoice by ID
const deleteInvoice = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('DELETE FROM invoices WHERE id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getTotalAmountsByStatus = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            `SELECT 
                SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) AS total_paid_amount,
                SUM(CASE WHEN status = 'overdue' THEN total_amount ELSE 0 END) AS total_overdue_amount,
                SUM(CASE WHEN status = 'cancelled' THEN total_amount ELSE 0 END) AS total_cancelled_amount,
                SUM(CASE WHEN status = 'draft' THEN total_amount ELSE 0 END) AS total_draft_amount,
                SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) AS total_pending_amount,
                SUM(CASE WHEN status = 'partially_paid' THEN total_amount ELSE 0 END) AS total_partially_paid_amount,
                SUM(CASE WHEN status = 'unpaid' THEN total_amount ELSE 0 END) AS total_unpaid_amount,
                SUM(CASE WHEN status = 'refunded' THEN total_amount ELSE 0 END) AS total_refunded_amount,
                SUM(total_amount) AS total_all_statuses
            FROM invoices`,
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                const totals = {
                    total_paid_amount: results[0]?.total_paid_amount || 0,
                    total_overdue_amount: results[0]?.total_overdue_amount || 0,
                    total_cancelled_amount: results[0]?.total_cancelled_amount || 0,
                    total_draft_amount: results[0]?.total_draft_amount || 0,
                    total_pending_amount: results[0]?.total_pending_amount || 0,
                    total_partially_paid_amount: results[0]?.total_partially_paid_amount || 0,
                    total_unpaid_amount: results[0]?.total_unpaid_amount || 0,
                    total_refunded_amount: results[0]?.total_refunded_amount || 0,
                    total_all_statuses: results[0]?.total_all_statuses || 0
                };
                resolve(totals);
            }
        );
    });
};

module.exports = {
    generateInvoiceNumber,
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    getTotalInvoiceCount,
    getTotalAmountsByStatus,
    getInvoiceDetailsForPDF
};

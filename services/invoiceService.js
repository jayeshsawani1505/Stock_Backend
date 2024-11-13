const dbconnection = require('../config/database');

// Function to generate a unique invoice number
const generateInvoiceNumber = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT MAX(invoice_number) AS last_invoice_number FROM invoices', (error, results) => {
            if (error) return reject(error);

            let lastInvoiceNumber = results[0].last_invoice_number;
            let newInvoiceNumber;

            if (!lastInvoiceNumber) {
                // Start with the first invoice number if there are none in the database
                newInvoiceNumber = "INV-001";
            } else {
                // Extract the numeric part, increment it, and add leading zeros if necessary
                const numericPart = parseInt(lastInvoiceNumber.replace("INV-", ""), 10);
                const incrementedNumber = numericPart + 1;

                // Format the incremented number back to the "INV-XXX" format
                newInvoiceNumber = `INV-${String(incrementedNumber).padStart(3, '0')}`;
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
    const { invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, notes, terms_conditions, total_amount } = invoiceData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO invoices (invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id,subproduct_id, quantity, unit, rate, notes, terms_conditions, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, notes, terms_conditions, total_amount],
            (error, results) => {
                if (error) return reject(error);
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
            JOIN customers ON invoices.customer_id = customers.customer_id ORDER BY created_at DESC
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
                customers.*
            FROM invoices
            JOIN products ON invoices.product_id = products.product_id
            JOIN category ON products.category_id = category.category_id
            JOIN customers ON invoices.customer_id = customers.customer_id
            LEFT JOIN subproducts ON invoices.subproduct_id = subproducts.subproduct_id
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
    const { invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount } = invoiceData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE invoices SET invoice_number = ?, customer_id = ?, invoice_date = ?, due_date = ?, reference_number = ?, status = ?, recurring = ?, recurring_cycle = ?, product_id = ?, subproduct_id = ?, quantity = ?, unit = ?, rate = ?, bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, subproduct_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, id],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
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
                console.log("Database result:", results); // Debugging log
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

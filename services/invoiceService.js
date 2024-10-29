const dbconnection = require('../config/database');

// Create a new invoice
const createInvoice = async (invoiceData) => {
    const { invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount } = invoiceData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO invoices (invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount],
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
        dbconnection.query('SELECT * FROM invoices', (error, results) => {
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

// Update an invoice by ID
const updateInvoice = async (id, invoiceData) => {
    const { invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount } = invoiceData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE invoices SET invoice_number = ?, customer_id = ?, invoice_date = ?, due_date = ?, reference_number = ?, status = ?, recurring = ?, recurring_cycle = ?, product_id = ?, quantity = ?, unit = ?, rate = ?, bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [invoice_number, customer_id, invoice_date, due_date, reference_number, status, recurring, recurring_cycle, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, id],
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

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};

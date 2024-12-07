const dbconnection = require('../config/database');

// Create a new return debit note
const create = async (returnDebitNoteData) => {
    const {
        vendor_id,
        purchase_order_date,
        due_date,
        reference_no,
        notes,
        terms_conditions,
        total_amount,
        signature_id,
        payment_mode,
        status,
        invoice_details
    } = returnDebitNoteData;

    // Convert invoice_details to a JSON string if required by the table
    const invoiceDetailsString = JSON.stringify(invoice_details);

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO return_debit_notes_purchases (vendor_id, purchase_order_date, due_date, reference_no, notes, terms_conditions, total_amount, signature_id, payment_mode, status, invoice_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [vendor_id, purchase_order_date, due_date, reference_no, notes, terms_conditions, total_amount, signature_id, payment_mode, status, invoiceDetailsString],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { id: result.insertId, ...returnDebitNoteData };
};

// Get a return debit note by ID
const getById = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM return_debit_notes_purchases WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all return debit notes
const getAll = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            `SELECT return_debit_notes_purchases.*, vendors.vendor_name 
            FROM return_debit_notes_purchases 
            JOIN vendors ON return_debit_notes_purchases.vendor_id = vendors.vendor_id ORDER BY created_at DESC`,
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a return debit note by ID
const update = async (id, returnDebitNoteData) => {
    const {
        vendor_id,
        purchase_order_date,
        due_date,
        reference_no,
        notes,
        terms_conditions,
        total_amount,
        signature_id,
        payment_mode,
        status,
        invoice_details
    } = returnDebitNoteData;

    // Stringify invoice_details if necessary
    const invoiceDetailsString = JSON.stringify(invoice_details);

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE return_debit_notes_purchases SET vendor_id = ?, purchase_order_date = ?, due_date = ?, reference_no = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_id = ?, payment_mode = ?, status = ?, invoice_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [
                vendor_id,
                purchase_order_date,
                due_date,
                reference_no,
                notes,
                terms_conditions,
                total_amount,
                signature_id,
                payment_mode,
                status,
                invoiceDetailsString,
                id
            ],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });

    // Check if the update was successful
    return result.affectedRows > 0
        ? { id, ...returnDebitNoteData }
        : null;
};

// Delete a return debit note by ID
const deleteReturnDebitNoteService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM return_debit_notes_purchases WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteReturnDebitNoteService
};

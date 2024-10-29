const dbconnection = require('../config/database');

// Create a new return debit note
const create = async (returnDebitNoteData) => {
    const {
        purchase_id,
        vendor_id,
        purchase_order_date,
        due_date,
        reference_no,
        product_id,
        quantity,
        unit,
        rate,
        bank_id,
        notes,
        terms_conditions,
        total_amount,
        signature_image
    } = returnDebitNoteData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO return_debit_notes_purchases (purchase_id, vendor_id, purchase_order_date, due_date, reference_no, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [purchase_id, vendor_id, purchase_order_date, due_date, reference_no, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image],
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
            'SELECT * FROM return_debit_notes_purchases',
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
        purchase_id,
        vendor_id,
        purchase_order_date,
        due_date,
        reference_no,
        product_id,
        quantity,
        unit,
        rate,
        bank_id,
        notes,
        terms_conditions,
        total_amount,
        signature_image
    } = returnDebitNoteData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE return_debit_notes_purchases SET purchase_id = ?, vendor_id = ?, purchase_order_date = ?, due_date = ?, reference_no = ?, product_id = ?, quantity = ?, unit = ?, rate = ?, bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [purchase_id, vendor_id, purchase_order_date, due_date, reference_no, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...returnDebitNoteData } : null;
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

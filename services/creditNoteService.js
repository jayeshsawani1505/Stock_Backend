// services/creditNoteService.js
const dbconnection = require('../config/database');

// Create a new credit note
const createCreditNoteService = async (creditNoteData) => {
    const {
        customer_id,
        creditNote_date,
        due_date,
        reference_number,
        product_name,
        product_id,
        quantity,
        unit,
        rate,
        bank_id,
        notes,
        terms_conditions,
        total_amount,
        signature_image
    } = creditNoteData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO creditnoteinvoices (customer_id, creditNote_date, due_date, reference_number, product_name, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                customer_id,
                creditNote_date,
                due_date,
                reference_number,
                product_name,
                product_id,
                quantity,
                unit,
                rate,
                bank_id,
                notes,
                terms_conditions,
                total_amount,
                signature_image
            ],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });

    return { creditNoteId: result.insertId };
};

// Get a credit note by ID
const getCreditNoteService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM creditnoteinvoices WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all credit notes
const getCreditNotesService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM creditnoteinvoices',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a credit note by ID
const updateCreditNoteService = async (id, creditNoteData) => {
    const {
        customer_id,
        creditNote_date,
        due_date,
        reference_number,
        product_name,
        product_id,
        quantity,
        unit,
        rate,
        bank_id,
        notes,
        terms_conditions,
        total_amount,
        signature_image
    } = creditNoteData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE creditnoteinvoices SET customer_id = ?, creditNote_date = ?, due_date = ?, reference_number = ?, product_name = ?, product_id = ?, quantity = ?, unit = ?, rate = ?, bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [
                customer_id,
                creditNote_date,
                due_date,
                reference_number,
                product_name,
                product_id,
                quantity,
                unit,
                rate,
                bank_id,
                notes,
                terms_conditions,
                total_amount,
                signature_image,
                id
            ],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });

    return result.affectedRows > 0 ? { id, ...creditNoteData } : null;
};

// Delete a credit note by ID
const deleteCreditNoteService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM creditnoteinvoices WHERE id = ?',
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
    createCreditNoteService,
    getCreditNoteService,
    getCreditNotesService,
    updateCreditNoteService,
    deleteCreditNoteService
};

const dbconnection = require('../config/database');

// Create a new credit note invoice
const createCreditNoteInvoiceService = async (creditNoteData) => {
    const {
        creditNote_date, due_date, reference_number,
        product_id, quantity, unit, rate, notes, terms_conditions,
        total_amount, signature_image
    } = creditNoteData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO creditnoteinvoices 
            ( creditNote_date, due_date, reference_number, 
            product_id, quantity, unit, rate, notes, terms_conditions, 
            total_amount, signature_image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                creditNote_date, due_date, reference_number,
                product_id, quantity, unit, rate, notes, terms_conditions,
                total_amount, signature_image
            ],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { invoiceId: result.insertId };
};

// Get a credit note invoice by ID
const getCreditNoteInvoiceService = async (id) => {
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

// Get all credit note invoices
const getCreditNoteInvoicesService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM creditnoteinvoices ORDER BY created_at DESC',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a credit note invoice by ID
const updateCreditNoteInvoiceService = async (id, creditNoteData) => {
    const {
        customer_id, creditNote_date, due_date, reference_number,
        product_id, quantity, unit, rate, notes, terms_conditions,
        total_amount, signature_image
    } = creditNoteData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            `UPDATE creditnoteinvoices SET 
            customer_id = ?, creditNote_date = ?, due_date = ?, reference_number = ?, 
            product_id = ?, quantity = ?, unit = ?, rate = ?, 
            notes = ?, terms_conditions = ?, total_amount = ?, 
            signature_image = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?`,
            [
                customer_id, creditNote_date, due_date, reference_number,
                product_id, quantity, unit, rate, notes, terms_conditions,
                total_amount, signature_image, id
            ],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...creditNoteData } : null;
};

// Delete a credit note invoice by ID
const deleteCreditNoteInvoiceService = async (id) => {
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
    createCreditNoteInvoiceService,
    getCreditNoteInvoiceService,
    getCreditNoteInvoicesService,
    updateCreditNoteInvoiceService,
    deleteCreditNoteInvoiceService
};

const dbconnection = require('../config/database');

// Create a new quotation
const createQuotationService = async (quotationData) => {
    const {
        quotation_number,
        customer_id,
        quotation_date,
        due_date,
        reference_number,
        status,
        product_id,
        quantity,
        unit,
        rate,
        bank_id,
        notes,
        terms_conditions,
        total_amount,
        signature_image
    } = quotationData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO quotations (quotation_number, customer_id, quotation_date, due_date, reference_number, status, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [quotation_number, customer_id, quotation_date, due_date, reference_number, status, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { quotationId: result.insertId };
};

// Get a quotation by ID
const getQuotationService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM quotations WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all quotations
const getQuotationsService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM quotations',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a quotation by ID
const updateQuotationService = async (id, quotationData) => {
    const {
        quotation_number,
        customer_id,
        quotation_date,
        due_date,
        reference_number,
        status,
        product_id,
        quantity,
        unit,
        rate,
        bank_id,
        notes,
        terms_conditions,
        total_amount,
        signature_image
    } = quotationData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE quotations SET quotation_number = ?, customer_id = ?, quotation_date = ?, due_date = ?, reference_number = ?, status = ?, product_id = ?, quantity = ?, unit = ?, rate = ?, bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [quotation_number, customer_id, quotation_date, due_date, reference_number, status, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...quotationData } : null;
};

// Delete a quotation by ID
const deleteQuotationService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM quotations WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0;
};
// Get quotations by customer ID
const getQuotationsByCustomerIdService = async (customerId) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM quotations WHERE customer_id = ?',
            [customerId],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};
module.exports = {
    createQuotationService,
    getQuotationService,
    getQuotationsService,
    updateQuotationService,
    deleteQuotationService,
    getQuotationsByCustomerIdService
};

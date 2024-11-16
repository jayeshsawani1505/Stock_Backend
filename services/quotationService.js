const dbconnection = require('../config/database');

// Function to generate a unique Quotation number
const generateQuotationNumber = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT MAX(id) AS last_Quotation_id FROM quotations', (error, results) => {
            if (error) return reject(error);

            let lastQuotationId = results[0].last_Quotation_id;
            let newQuotationNumber;

            if (!lastQuotationId) {
                // Start with the first id (you can adjust this logic as needed)
                newQuotationNumber = "QTN-001";  // The first Quotation will have "QTN-001"
            } else {
                // Increment the id by 1
                newQuotationNumber = `QTN-${String(lastQuotationId + 1).padStart(3, '0')}`;
            }

            resolve(newQuotationNumber);
        });
    });
};

// Create a new quotation
const createQuotationService = async (quotationData) => {
    const {
        quotation_number,
        customer_id,
        quotation_date,
        due_date,
        status,
        product_id,
        subproduct_id,
        quantity,
        rate,
        notes,
        terms_conditions,
        total_amount,
        signature_id
    } = quotationData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO quotations (quotation_number, customer_id, quotation_date, due_date,  status, product_id, subproduct_id, quantity, rate, notes, terms_conditions, total_amount, signature_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [quotation_number, customer_id, quotation_date, due_date, status, product_id, subproduct_id, quantity, rate, notes, terms_conditions, total_amount, signature_id],
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
    return new Promise((resolve, reject) => {
        const query = `
             SELECT 
                quotations.*, 
                category.category_name,
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                customers.profile_photo AS customer_profile_photo
            FROM quotations
            JOIN products ON quotations.product_id = products.product_id
            JOIN category ON products.category_id = category.category_id
            JOIN customers ON quotations.customer_id = customers.customer_id ORDER BY quotations.created_at DESC
        `;

        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Update a quotation by ID
const updateQuotationService = async (id, quotationData) => {
    const {
        quotation_number,
        customer_id,
        quotation_date,
        due_date,
        status,
        product_id,
        subproduct_id,
        quantity,
        rate,
        notes,
        terms_conditions,
        total_amount,
        signature_id
    } = quotationData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE quotations SET quotation_number = ?, customer_id = ?, quotation_date = ?, due_date = ?, status = ?, product_id = ?,subproduct_id = ?, quantity = ?, rate = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [quotation_number, customer_id, quotation_date, due_date, status, product_id, subproduct_id, quantity, rate, notes, terms_conditions, total_amount, signature_id, id],
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
    generateQuotationNumber,
    createQuotationService,
    getQuotationService,
    getQuotationsService,
    updateQuotationService,
    deleteQuotationService,
    getQuotationsByCustomerIdService
};

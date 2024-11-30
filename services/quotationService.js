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
        notes,
        terms_conditions,
        total_amount,
        signature_id,
        invoice_details
    } = quotationData;

    // Stringify invoice_details if necessary (if it's an object/array)
    const invoiceDetailsString = JSON.stringify(invoice_details);

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO quotations (quotation_number, customer_id, quotation_date, due_date, status, notes, terms_conditions, total_amount, signature_id, invoice_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                quotation_number,
                customer_id,
                quotation_date,
                due_date,
                status,
                notes,
                terms_conditions,
                total_amount,
                signature_id,
                invoiceDetailsString
            ],
            (error, results) => {
                if (error) reject(new Error(`Error creating quotation: ${error.message}`));
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
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                customers.profile_photo AS customer_profile_photo
            FROM quotations
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
        notes,
        terms_conditions,
        total_amount,
        signature_id,
        invoice_details // Assuming you want to update this field as well
    } = quotationData;

    // Stringify invoice_details if it's an object/array
    const invoiceDetailsString = JSON.stringify(invoice_details);

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE quotations SET quotation_number = ?, customer_id = ?, quotation_date = ?, due_date = ?, status = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_id = ?, invoice_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [
                quotation_number,
                customer_id,
                quotation_date,
                due_date,
                status,
                notes,
                terms_conditions,
                total_amount,
                signature_id,
                invoiceDetailsString,
                id
            ],
            (error, results) => {
                if (error) reject(new Error(`Error updating quotation: ${error.message}`));
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
const getFilteredQuotationsService = async (filters) => {
    try {
        const { startDate, endDate, customerId } = filters;

        // Base SQL query
        let query = `
            SELECT 
                quotations.*, 
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                customers.profile_photo AS customer_profile_photo
            FROM quotations
            JOIN customers ON quotations.customer_id = customers.customer_id
        `;

        // Collect conditions and values for prepared statement
        const conditions = [];
        const values = [];

        if (startDate) {
            conditions.push("quotations.created_at >= ?");
            values.push(startDate);
        }

        if (endDate) {
            conditions.push("quotations.created_at <= ?");
            values.push(endDate);
        }

        if (customerId) {
            conditions.push("quotations.customer_id = ?");
            values.push(customerId);
        }

        // Add WHERE clause if there are any conditions
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        // Add ORDER BY clause
        query += ` ORDER BY quotations.created_at DESC`;

        // Execute the query
        return new Promise((resolve, reject) => {
            dbconnection.query(query, values, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    } catch (error) {
        console.error("Error in getFilteredQuotationsService:", error);
        throw error;
    }
};

module.exports = {
    generateQuotationNumber,
    createQuotationService,
    getQuotationService,
    getQuotationsService,
    updateQuotationService,
    deleteQuotationService,
    getQuotationsByCustomerIdService,
    getFilteredQuotationsService
};

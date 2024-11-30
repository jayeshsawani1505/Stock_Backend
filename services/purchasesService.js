const dbconnection = require('../config/database');

// Create a new purchase
const createPurchase = async (purchaseData) => {
    const {
        vendor_id,
        purchase_date,
        due_date,
        reference_no,
        supplier_invoice_serial_no,
        notes,
        terms_conditions,
        total_amount,
        payment_mode,
        signature_id,
        status,
        invoice_details
    } = purchaseData;

    // Serialize invoice_details
    const serializedInvoiceDetails = JSON.stringify(invoice_details);

    return new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO purchases (vendor_id, purchase_date,
             due_date, reference_no, supplier_invoice_serial_no, notes, 
             terms_conditions, total_amount, payment_mode, signature_id, status, invoice_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                vendor_id,
                purchase_date,
                due_date,
                reference_no,
                supplier_invoice_serial_no,
                notes,
                terms_conditions,
                total_amount,
                payment_mode,
                signature_id,
                status,
                serializedInvoiceDetails
            ],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
            }
        );
    });
};

const createPurchaseExcel = async (purchases) => {
    const sql = `
        INSERT INTO purchases 
        (vendor_id, purchase_date, due_date, reference_no, 
        supplier_invoice_serial_no, product_id, subproduct_id, quantity, rate, 
        notes, terms_conditions, total_amount, payment_mode, status) 
        VALUES ?
    `;

    const values = purchases.map(purchase => [
        purchase.vendor_id,
        purchase.purchase_date,
        purchase.due_date,
        purchase.reference_no,
        purchase.supplier_invoice_serial_no,
        purchase.product_id,
        purchase.subproduct_id,
        purchase.quantity,
        purchase.rate,
        purchase.notes,
        purchase.terms_conditions,
        purchase.total_amount,
        purchase.payment_mode,
        purchase.status
    ]);

    return new Promise((resolve, reject) => {
        dbconnection.query(sql, [values], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get all purchases
const getAllPurchases = async () => {
    try {
        const results = await new Promise((resolve, reject) => {
            dbconnection.query(`
                SELECT purchases.*, vendors.vendor_name 
                FROM purchases 
                JOIN vendors ON purchases.vendor_id = vendors.vendor_id ORDER BY created_at DESC
            `, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
        return results;
    } catch (error) {
        throw error;
    }
};

// Get a purchase by ID
const getPurchaseById = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM purchases WHERE id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Update a purchase by ID
const updatePurchase = async (id, purchaseData) => {
    const {
        vendor_id,
        purchase_date,
        due_date,
        reference_no,
        supplier_invoice_serial_no,
        notes,
        terms_conditions,
        total_amount,
        payment_mode,
        signature_id,
        status,
        invoice_details
    } = purchaseData;

    // Serialize invoice_details
    const serializedInvoiceDetails = JSON.stringify(invoice_details);

    return new Promise((resolve, reject) => {
        dbconnection.query(
            `UPDATE purchases 
             SET vendor_id = ?, 
                 purchase_date = ?, 
                 due_date = ?, 
                 reference_no = ?, 
                 supplier_invoice_serial_no = ?, 
                 notes = ?, 
                 terms_conditions = ?, 
                 total_amount = ?, 
                 payment_mode = ?, 
                 signature_id = ?, 
                 status = ?, 
                 invoice_details = ?, 
                 updated_at = CURRENT_TIMESTAMP 
             WHERE id = ?`,
            [
                vendor_id,
                purchase_date,
                due_date,
                reference_no,
                supplier_invoice_serial_no,
                notes,
                terms_conditions,
                total_amount,
                payment_mode,
                signature_id,
                status,
                serializedInvoiceDetails,
                id
            ],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
            }
        );
    });
};

// Delete a purchase by ID
const deletePurchase = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('DELETE FROM purchases WHERE id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getFilteredPurchases = async (query) => {
    try {
        const { startDate, endDate, vendorId } = query;

        // Base SQL query
        let sql = `
            SELECT purchases.*, vendors.vendor_name 
            FROM purchases 
            JOIN vendors ON purchases.vendor_id = vendors.vendor_id
        `;

        // Collect conditions and parameter values
        const conditions = [];
        const values = [];

        if (startDate) {
            conditions.push("purchases.created_at >= ?");
            values.push(startDate);
        }

        if (endDate) {
            conditions.push("purchases.created_at <= ?");
            values.push(endDate);
        }

        if (vendorId) {
            conditions.push("purchases.vendor_id = ?");
            values.push(vendorId);
        }

        // Add WHERE clause only if there are conditions
        if (conditions.length > 0) {
            sql += ` WHERE ${conditions.join(" AND ")}`;
        }

        // Always add ordering
        sql += ` ORDER BY purchases.created_at DESC`;

        // Execute query
        const results = await new Promise((resolve, reject) => {
            dbconnection.query(sql, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        if (results.length === 0) {
            return { success: false, message: "Purchase not found." };
        }

        return { success: true, data: results };
    } catch (error) {
        console.error("Error in getFilteredPurchases:", error);
        throw error;
    }
};

module.exports = {
    createPurchase,
    createPurchaseExcel,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
    getFilteredPurchases
};

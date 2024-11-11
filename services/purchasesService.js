const dbconnection = require('../config/database');

// Create a new purchase
const createPurchase = async (purchaseData) => {
    const { vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, rate, notes, terms_conditions, total_amount, payment_mode, status } = purchaseData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO purchases (vendor_id, purchase_date,
             due_date, reference_no, supplier_invoice_serial_no,
             product_id, quantity, rate, notes, 
             terms_conditions, total_amount, payment_mode, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, rate, notes, terms_conditions, total_amount, payment_mode, status],
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
        supplier_invoice_serial_no, product_id, quantity, rate, 
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
    const { vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, rate, notes, terms_conditions, total_amount, payment_mode, status } = purchaseData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE purchases SET vendor_id = ?, purchase_date = ?, due_date = ?, reference_no = ?, supplier_invoice_serial_no = ?, product_id = ?, quantity = ?, rate = ?, notes = ?, terms_conditions = ?, total_amount = ?, payment_mode = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, rate, notes, terms_conditions, total_amount, payment_mode, status, id],
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

module.exports = {
    createPurchase,
    createPurchaseExcel,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
};

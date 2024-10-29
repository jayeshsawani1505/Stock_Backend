const dbconnection = require('../config/database');

// Create a new purchase
const createPurchase = async (purchaseData) => {
    const { purchase_id, vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount } = purchaseData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO purchases (purchase_id, vendor_id, purchase_date,
             due_date, reference_no, supplier_invoice_serial_no,
             product_id, quantity, unit, rate, bank_id, notes, 
             terms_conditions, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [purchase_id, vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
            }
        );
    });
};

// Get all purchases
const getAllPurchases = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM purchases', (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
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
    const { purchase_id, vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount } = purchaseData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE purchases SET purchase_id = ?, vendor_id = ?, purchase_date = ?, due_date = ?, reference_no = ?, supplier_invoice_serial_no = ?, product_id = ?, quantity = ?, unit = ?, rate = ?, bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [purchase_id, vendor_id, purchase_date, due_date, reference_no, supplier_invoice_serial_no, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, id],
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
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
};

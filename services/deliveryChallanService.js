const dbconnection = require('../config/database');

// Create a new delivery challan
const createDeliveryChallanService = async (challanData) => {
    const result = await new Promise((resolve, reject) => {
        const query = `INSERT INTO delivery_challans 
                       (delivery_number, customer_id, delivery_date, due_date, reference_number, product_id, quantity, unit, rate, bank_id, notes, terms_conditions, total_amount, signature_image) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            challanData.delivery_number, challanData.customer_id, challanData.delivery_date,
            challanData.due_date, challanData.reference_number, challanData.product_id,
            challanData.quantity, challanData.unit, challanData.rate, challanData.bank_id,
            challanData.notes, challanData.terms_conditions, challanData.total_amount,
            challanData.signature_image
        ];
        dbconnection.query(query, values, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
    return result.insertId;
};

// Get all delivery challans
const getDeliveryChallansService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM delivery_challans ORDER BY created_at DESC', (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
    return rows;
};

// Get delivery challan by ID
const getDeliveryChallanService = async (id) => {
    const row = await new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM delivery_challans WHERE id = ?', [id], (error, results) => {
            if (error) reject(error);
            else resolve(results[0]);
        });
    });
    return row;
};

// Update delivery challan by ID
const updateDeliveryChallanService = async (id, challanData) => {
    const result = await new Promise((resolve, reject) => {
        const query = `UPDATE delivery_challans SET 
                       delivery_number = ?, customer_id = ?, delivery_date = ?, due_date = ?, 
                       reference_number = ?, product_id = ?, quantity = ?, unit = ?, rate = ?, 
                       bank_id = ?, notes = ?, terms_conditions = ?, total_amount = ?, 
                       signature_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        const values = [
            challanData.delivery_number, challanData.customer_id, challanData.delivery_date,
            challanData.due_date, challanData.reference_number, challanData.product_id,
            challanData.quantity, challanData.unit, challanData.rate, challanData.bank_id,
            challanData.notes, challanData.terms_conditions, challanData.total_amount,
            challanData.signature_image, id
        ];
        dbconnection.query(query, values, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
    return result.affectedRows > 0;
};

// Delete delivery challan by ID
const deleteDeliveryChallanService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query('DELETE FROM delivery_challans WHERE id = ?', [id], (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
    return result.affectedRows > 0;
};

module.exports = {
    createDeliveryChallanService,
    getDeliveryChallansService,
    getDeliveryChallanService,
    updateDeliveryChallanService,
    deleteDeliveryChallanService
};

const dbconnection = require('../config/database');

const generateDeliveryChallanNumber = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT MAX(id) AS last_challan_id FROM delivery_challans', (error, results) => {
            if (error) return reject(error);

            let lastChallanId = results[0].last_challan_id;
            let newChallanNumber;

            if (!lastChallanId) {
                // Start with the first id (you can adjust this logic as needed)
                newChallanNumber = "DCN-001"; // The first Delivery Challan will have "DCN-001"
            } else {
                // Increment the id by 1
                newChallanNumber = `DCN-${String(lastChallanId + 1).padStart(3, '0')}`;
            }

            resolve(newChallanNumber);
        });
    });
};

// Create a new delivery challan
const createDeliveryChallanService = async (challanData) => {
    const result = await new Promise((resolve, reject) => {
        const query = `INSERT INTO delivery_challans 
                       (delivery_number, customer_id, delivery_date, due_date,  product_id, subproduct_id, quantity,  rate, notes, terms_conditions, total_amount, signature_id, status) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            challanData.delivery_number, challanData.customer_id, challanData.delivery_date,
            challanData.due_date, challanData.product_id, challanData.subproduct_id,
            challanData.quantity, challanData.rate,
            challanData.notes, challanData.terms_conditions, challanData.total_amount,
            challanData.signature_id, challanData.status
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
        dbconnection.query(`
            SELECT 
                delivery_challans.*, 
                category.category_name,
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                customers.profile_photo AS customer_profile_photo
            FROM delivery_challans
            JOIN products ON delivery_challans.product_id = products.product_id
            JOIN category ON products.category_id = category.category_id
            JOIN customers ON delivery_challans.customer_id = customers.customer_id 
            ORDER BY delivery_challans.created_at DESC`,
            (error, results) => {
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

const getDeliveryChallanDetailsForPDF = async (id) => {
    return new Promise((resolve, reject) => {
        const query = `
           SELECT 
            delivery_challans.*, 
            category.category_name,
            products.product_name,
            subproducts.subproduct_name,
            customers.*,
            signature.signature_name,
            signature.signature_photo
        FROM delivery_challans
        JOIN products ON delivery_challans.product_id = products.product_id
        JOIN category ON products.category_id = category.category_id
        JOIN customers ON delivery_challans.customer_id = customers.customer_id
        LEFT JOIN subproducts ON delivery_challans.subproduct_id = subproducts.subproduct_id
        LEFT JOIN signature ON delivery_challans.signature_id = signature.signature_id
        WHERE delivery_challans.id = ?
        `;

        // Query the database
        dbconnection.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);  // Resolve with the query results
        });
    });
};


// Update delivery challan by ID
const updateDeliveryChallanService = async (id, challanData) => {
    const result = await new Promise((resolve, reject) => {
        const query = `UPDATE delivery_challans SET 
                       delivery_number = ?, customer_id = ?, delivery_date = ?, due_date = ?, 
                        product_id = ?, subproduct_id = ?, quantity = ?, rate = ?, 
                       notes = ?, terms_conditions = ?, total_amount = ?, 
                       signature_id = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        const values = [
            challanData.delivery_number, challanData.customer_id, challanData.delivery_date,
            challanData.due_date, challanData.product_id, challanData.subproduct_id,
            challanData.quantity, challanData.rate,
            challanData.notes, challanData.terms_conditions, challanData.total_amount,
            challanData.signature_id, challanData.status, id
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
    generateDeliveryChallanNumber,
    createDeliveryChallanService,
    getDeliveryChallansService,
    getDeliveryChallanService,
    updateDeliveryChallanService,
    deleteDeliveryChallanService,
    getDeliveryChallanDetailsForPDF
};

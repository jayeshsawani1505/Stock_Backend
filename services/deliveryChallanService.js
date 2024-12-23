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
    // Serialize invoice_details
    const serializedInvoiceDetails = JSON.stringify(challanData.invoice_details);

    const result = await new Promise((resolve, reject) => {
        const query = `INSERT INTO delivery_challans 
                       (delivery_number, customer_id, delivery_date, due_date, notes, terms_conditions,
                       adjustmentType,
                        adjustmentValue,
                        adjustmentType2,
                        adjustmentValue2,
                        subtotal_amount, total_amount, signature_id, status, invoice_details) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            challanData.delivery_number,
            challanData.customer_id,
            challanData.delivery_date,
            challanData.due_date,
            challanData.notes,
            challanData.terms_conditions,
            challanData.adjustmentType,
            challanData.adjustmentValue,
            challanData.adjustmentType2,
            challanData.adjustmentValue2,
            challanData.subtotal_amount,
            challanData.total_amount,
            challanData.signature_id,
            challanData.status,
            serializedInvoiceDetails // Use serialized data here
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
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                customers.profile_photo AS customer_profile_photo
            FROM delivery_challans
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
        const deliveryChallanQuery = `
            SELECT 
                delivery_challans.*, 
                customers.*, 
                signature.signature_name, 
                signature.signature_photo
            FROM delivery_challans
            JOIN customers ON delivery_challans.customer_id = customers.customer_id
            LEFT JOIN signature ON delivery_challans.signature_id = signature.signature_id
            WHERE delivery_challans.id = ?
        `;

        console.log("Executing Query with ID: ", id); // Log the input ID

        dbconnection.query(deliveryChallanQuery, [id], (challanError, challanResults) => {
            if (challanError) {
                console.error("Database Query Error: ", challanError);
                return reject(challanError);
            }

            console.log("Query Results: ", challanResults); // Log the raw results

            if (challanResults.length === 0) {
                console.warn("No results found for ID: ", id);
                return reject(new Error("Delivery challan not found"));
            }

            resolve(challanResults);
        });
    });
};


// Update delivery challan by ID
const updateDeliveryChallanService = async (id, challanData) => {
    const serializedInvoiceDetails = challanData.invoice_details
        ? JSON.stringify(challanData.invoice_details)
        : null;

    const result = await new Promise((resolve, reject) => {
        const query = `UPDATE delivery_challans SET 
                       delivery_number = ?, customer_id = ?, delivery_date = ?, due_date = ?, 
                       notes = ?, terms_conditions = ?,
                       adjustmentType = ?,
                        adjustmentValue = ?,
                        adjustmentType2 = ?,
                        adjustmentValue2 = ?,
                        subtotal_amount = ?,
                        total_amount = ?, 
                       signature_id = ?, status = ?, invoice_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        const values = [
            challanData.delivery_number,
            challanData.customer_id,
            challanData.delivery_date,
            challanData.due_date,
            challanData.notes,
            challanData.terms_conditions,
            challanData.adjustmentType,
            challanData.adjustmentValue,
            challanData.adjustmentType2,
            challanData.adjustmentValue2,
            challanData.subtotal_amount,
            challanData.total_amount,
            challanData.signature_id,
            challanData.status,
            serializedInvoiceDetails, // Add serialized invoice_details
            id
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

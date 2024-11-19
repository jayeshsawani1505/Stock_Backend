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
                       (delivery_number, customer_id, delivery_date, due_date, notes, terms_conditions, total_amount, signature_id, status, invoice_details) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            challanData.delivery_number,
            challanData.customer_id,
            challanData.delivery_date,
            challanData.due_date,
            challanData.notes,
            challanData.terms_conditions,
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
        const invoiceQuery = `
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

        // Fetch the invoice and its associated data
        dbconnection.query(invoiceQuery, [id], async (invoiceError, invoiceResults) => {
            if (invoiceError) return reject(invoiceError);
            if (invoiceResults.length === 0) return reject(new Error("Challan not found"));

            const invoice = invoiceResults[0]; // Assuming only one invoice is fetched
            let invoiceDetails = [];

            try {
                // Parse the JSON string in `invoice_details`
                invoiceDetails = JSON.parse(invoice.invoice_details);
                console.log("Challan Details Parsed: ", invoiceDetails);
            } catch (error) {
                return reject(new Error("Invalid Challan JSON"));
            }

            if (invoiceDetails.length === 0) {
                invoice.invoice_details = [];
                return resolve(invoice);
            }

            // Create dynamic placeholders for the query
            const productIds = invoiceDetails.map((detail) => detail.product_id);
            const subproductIds = invoiceDetails.map((detail) => detail.subproduct_id);

            const detailsQuery = `
                SELECT 
                    products.product_id, 
                    products.product_name, 
                    subproducts.subproduct_id, 
                    subproducts.subproduct_name
                FROM products
                LEFT JOIN subproducts ON products.product_id = subproducts.product_id
                WHERE products.product_id IN (?) 
                AND (subproducts.subproduct_id IN (?) OR subproducts.subproduct_id IS NULL)
            `;

            // Query to get product and subproduct names
            dbconnection.query(detailsQuery, [productIds, subproductIds], (detailsError, detailsResults) => {
                if (detailsError) return reject(detailsError);

                // Map product and subproduct names back to invoiceDetails
                invoiceDetails = invoiceDetails.map((detail) => {
                    const product = detailsResults.find((item) => item.product_id === detail.product_id);
                    const subproduct = detailsResults.find((item) => item.subproduct_id === detail.subproduct_id);

                    return {
                        ...detail,
                        product_name: product ? product.product_name : null,
                        subproduct_name: subproduct ? subproduct.subproduct_name : null,
                    };
                });

                invoice.invoice_details = invoiceDetails; // Update the invoice with enriched details
                resolve([invoice]);  // Wrap in an array as expected in the controller
            });
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
                       notes = ?, terms_conditions = ?, total_amount = ?, 
                       signature_id = ?, status = ?, invoice_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        const values = [
            challanData.delivery_number,
            challanData.customer_id,
            challanData.delivery_date,
            challanData.due_date,
            challanData.notes,
            challanData.terms_conditions,
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

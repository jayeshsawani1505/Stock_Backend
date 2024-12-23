const dbconnection = require('../config/database');

// Create a new return debit note
const create = async (returnDebitNoteData) => {
    const {
        vendor_id,
        purchase_order_date,
        due_date,
        reference_no,
        notes,
        terms_conditions,
        adjustmentType,
        adjustmentValue,
        adjustmentType2,
        adjustmentValue2,
        subtotal_amount,
        total_amount,
        signature_id,
        payment_mode,
        status,
        invoice_details
    } = returnDebitNoteData;

    // Convert invoice_details to a JSON string
    const invoiceDetailsJSON = JSON.stringify(invoice_details);

    return new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO return_debit_notes_purchases 
            (vendor_id, purchase_order_date, due_date, reference_no, notes, terms_conditions, adjustmentType, adjustmentValue, adjustmentType2, adjustmentValue2, subtotal_amount, total_amount, signature_id, payment_mode, status, invoice_details) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                vendor_id,
                purchase_order_date,
                due_date,
                reference_no,
                notes,
                terms_conditions,
                adjustmentType,
                adjustmentValue,
                adjustmentType2,
                adjustmentValue2,
                subtotal_amount,
                total_amount,
                signature_id,
                payment_mode,
                status,
                invoiceDetailsJSON
            ],
            async (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return reject({ message: 'Error creating return debit note.', error });
                }

                try {
                    // Assuming you have additional operations to perform here
                    for (const detail of invoice_details) {
                        const { product_name, quantity } = detail;
                        await outStockProduct(product_name, quantity);
                    }

                } catch (operationError) {
                    console.error('Error during post-insert operations:', operationError);
                    return reject({ message: 'Post-insert operations failed.', operationError });
                }

                resolve(results); // Resolve with the results
            }
        );
    });
};

// OutStock function for product
const outStockProduct = async (id, quantity) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE products SET quantity = quantity - ? WHERE product_name = ? AND quantity >= ?',
            [quantity, id, quantity],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('Not enough stock available'));
                }
                resolve(results);
            }
        );
    });
};
// Get a return debit note by ID
const getById = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM return_debit_notes_purchases WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all return debit notes
const getAll = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            `SELECT return_debit_notes_purchases.*, vendors.vendor_name 
            FROM return_debit_notes_purchases 
            JOIN vendors ON return_debit_notes_purchases.vendor_id = vendors.vendor_id ORDER BY created_at DESC`,
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a return debit note by ID
const update = async (id, returnDebitNoteData) => {
    const {
        vendor_id,
        purchase_order_date,
        due_date,
        reference_no,
        notes,
        terms_conditions,
        adjustmentType,
        adjustmentValue,
        adjustmentType2,
        adjustmentValue2,
        subtotal_amount,
        total_amount,
        signature_id,
        payment_mode,
        status,
        invoice_details
    } = returnDebitNoteData;

    // Stringify invoice_details for storage
    const invoiceDetailsString = JSON.stringify(invoice_details);

    return new Promise(async (resolve, reject) => {
        try {
            // Fetch existing invoice details for comparison
            const existingData = await new Promise((res, rej) => {
                dbconnection.query(
                    `SELECT invoice_details FROM return_debit_notes_purchases WHERE id = ?`,
                    [id],
                    (error, results) => {
                        if (error) return rej(error);
                        if (results.length === 0) return rej({ message: "Record not found" });
                        res(results[0].invoice_details ? JSON.parse(results[0].invoice_details) : []);
                    }
                );
            });

            // Find new or changed entries
            const newOrChangedEntries = invoice_details.filter(newDetail => {
                const existingDetail = existingData.find(
                    item => item.product_name === newDetail.product_name
                );
                return !existingDetail || existingDetail.quantity !== newDetail.quantity;
            });

            // Start the update query
            dbconnection.query(
                `UPDATE return_debit_notes_purchases SET vendor_id = ?, purchase_order_date = ?, due_date = ?, reference_no = ?, notes = ?, terms_conditions = ?, 
                adjustmentType = ?, adjustmentValue = ?, adjustmentType2 = ?, adjustmentValue2 = ?, subtotal_amount = ?, total_amount = ?, 
                signature_id = ?, payment_mode = ?, status = ?, invoice_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                [
                    vendor_id,
                    purchase_order_date,
                    due_date,
                    reference_no,
                    notes,
                    terms_conditions,
                    adjustmentType,
                    adjustmentValue,
                    adjustmentType2,
                    adjustmentValue2,
                    subtotal_amount,
                    total_amount,
                    signature_id,
                    payment_mode,
                    status,
                    invoiceDetailsString,
                    id
                ],
                async (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return reject({ message: 'Error updating return debit note.', error });
                    }

                    // If update is successful, call outStockProduct for new or changed entries
                    try {
                        for (const detail of newOrChangedEntries) {
                            const { product_name, quantity } = detail;
                            await outStockProduct(product_name, quantity);
                        }
                    } catch (operationError) {
                        console.error('Error during post-update operations:', operationError);
                        return reject({ message: 'Post-update operations failed.', operationError });
                    }

                    // Return the updated data if successful
                    resolve(results.affectedRows > 0
                        ? { id, ...returnDebitNoteData }
                        : null);
                }
            );
        } catch (fetchError) {
            console.error('Error fetching existing data:', fetchError);
            reject({ message: 'Error fetching existing data.', fetchError });
        }
    });
};

// Delete a return debit note by ID
const deleteReturnDebitNoteService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM return_debit_notes_purchases WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0;
};

const getReturnForPDF = async (id) => {
    return new Promise((resolve, reject) => {
        const returnQuery = `
            SELECT 
                return_debit_notes_purchases.*, 
                vendors.*, 
                signature.signature_name, 
                signature.signature_photo
            FROM return_debit_notes_purchases
            JOIN vendors ON return_debit_notes_purchases.vendor_id = vendors.vendor_id
            LEFT JOIN signature ON return_debit_notes_purchases.signature_id = signature.signature_id
            WHERE return_debit_notes_purchases.id = ?
        `;

        // Execute the query to fetch return details
        dbconnection.query(returnQuery, [id], (queryError, returnResults) => {
            if (queryError) {
                console.error("Database Query Error: ", queryError);
                return reject(queryError); // Reject the promise if there's a query error
            }

            if (returnResults.length === 0) {
                return reject(new Error("Return not found"));
            }

            // Extract the first result
            const returnData = returnResults[0];

            // Parse return_details JSON
            let returnDetails;
            try {
                returnDetails = JSON.parse(returnData.return_details || "[]");
                console.log("Parsed Return Details: ", returnDetails);
            } catch (error) {
                console.error("Invalid JSON in return_details: ", returnData.return_details);
                return reject(new Error("Invalid return_details JSON"));
            }

            // Add parsed details to the result
            returnData.return_details = returnDetails;

            // Resolve the promise with the complete return object
            resolve(returnData);
        });
    });
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteReturnDebitNoteService,
    getReturnForPDF
};

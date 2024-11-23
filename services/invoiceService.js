const dbconnection = require('../config/database');

// Function to generate a unique invoice number
const generateInvoiceNumber = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT MAX(id) AS last_invoice_id FROM invoices', (error, results) => {
            if (error) return reject(error);

            let lastInvoiceId = results[0].last_invoice_id;
            let newInvoiceNumber;

            if (!lastInvoiceId) {
                // Start with the first id (you can adjust this logic as needed)
                newInvoiceNumber = "INV-001";  // The first invoice will have "INV-001"
            } else {
                // Increment the id by 1
                newInvoiceNumber = `INV-${String(lastInvoiceId + 1).padStart(3, '0')}`;
            }

            resolve(newInvoiceNumber);
        });
    });
};

// Get total invoices count
const getTotalInvoiceCount = async () => {
    const count = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT COUNT(*) AS total_invoices FROM invoices', // Get total count of invoices
            (error, results) => {
                if (error) reject(error);
                else resolve(results[0].total_invoices); // Resolving the total count from the first row
            }
        );
    });

    return count;
};

// Create a new invoice
const createInvoice = async (invoiceData) => {
    const {
        invoice_number,
        customer_id,
        invoice_date,
        due_date,
        transporter_name,
        category_id,
        status,
        notes,
        terms_conditions,
        signature_id,
        total_amount,
        invoice_details
    } = invoiceData;

    // Convert invoice_details to a JSON string
    const invoiceDetailsJSON = JSON.stringify(invoice_details);

    return new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO invoices 
            (invoice_number, customer_id, invoice_date, due_date, transporter_name, category_id, status, notes, terms_conditions, signature_id, total_amount, invoice_details) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                invoice_number,
                customer_id,
                invoice_date,
                due_date,
                transporter_name,
                category_id,
                status,
                notes,
                terms_conditions,
                signature_id,
                total_amount,
                invoiceDetailsJSON
            ],
            async (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return reject({ message: 'Error creating invoice.', error });
                }

                try {
                    for (const detail of invoice_details) {
                        const { product_id, subproduct_id, quantity } = detail;

                        if (subproduct_id > 0) {
                            await outStockSubProduct(subproduct_id, quantity);
                        } else {
                            await outStockProduct(product_id, quantity);
                        }
                    }
                } catch (stockError) {
                    console.error('Stock adjustment error:', stockError);
                    return reject({ message: 'Stock adjustment failed.', stockError });
                }

                resolve(results); // Resolve with the results
            }
        );
    });
};

// OutStock function for sub product
const outStockSubProduct = async (id, quantity) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE subproducts SET quantity = quantity - ? WHERE subproduct_id = ? AND quantity >= ?',
            [quantity, id, quantity], // Add 'quantity' for the third placeholder
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

// OutStock function for product
const outStockProduct = async (id, quantity) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE products SET quantity = quantity - ? WHERE product_id = ? AND quantity >= ?',
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

// Get all invoices
const getAllInvoices = async () => {
    return new Promise((resolve, reject) => {
        const query = `
             SELECT 
                invoices.*, 
                customers.name AS customer_name,
                customers.phone AS customer_phone,
                customers.profile_photo AS customer_profile_photo
            FROM invoices
            JOIN customers ON invoices.customer_id = customers.customer_id ORDER BY invoices.created_at DESC
        `;

        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get an invoice by ID
const getInvoiceById = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM invoices WHERE id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const updateInvoiceStatus = async (id, status) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE invoices SET status = ? WHERE id = ?',
            [status, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('Invoice not found'));
                }
                resolve(results);
            }
        );
    });
};

const getInvoiceDetailsForPDF = async (id) => {
    return new Promise((resolve, reject) => {
        const invoiceQuery = `
            SELECT 
                invoices.*, 
                customers.*,
                category.category_name,
                signature.signature_name, 
                signature.signature_photo
            FROM invoices
            JOIN category ON invoices.category_id = category.category_id
            JOIN customers ON invoices.customer_id = customers.customer_id
            LEFT JOIN signature ON invoices.signature_id = signature.signature_id
            WHERE invoices.id = ?
        `;

        // Fetch the invoice and its associated data
        dbconnection.query(invoiceQuery, [id], async (invoiceError, invoiceResults) => {
            if (invoiceError) return reject(invoiceError);
            if (invoiceResults.length === 0) return reject(new Error("Invoice not found"));

            const invoice = invoiceResults[0]; // Assuming only one invoice is fetched
            let invoiceDetails = [];

            try {
                // Parse the JSON string in `invoice_details`
                invoiceDetails = JSON.parse(invoice.invoice_details);
                console.log("Invoice Details Parsed: ", invoiceDetails);
            } catch (error) {
                return reject(new Error("Invalid invoice_details JSON"));
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

// Update an invoice by ID
const updateInvoice = async (id, invoiceData) => {
    const { invoice_number, customer_id, invoice_date, due_date, transporter_name, category_id, status, notes, terms_conditions, total_amount, signature_id, invoice_details } = invoiceData;

    return new Promise((resolve, reject) => {
        const serializedInvoiceDetails = JSON.stringify(invoice_details); // Serialize invoice_details

        dbconnection.query(
            'UPDATE invoices SET invoice_number = ?, customer_id = ?, invoice_date = ?, due_date = ?, transporter_name = ?, category_id = ?, status = ?, notes = ?, terms_conditions = ?, total_amount = ?, signature_id = ?, invoice_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [invoice_number, customer_id, invoice_date, due_date, transporter_name, category_id, status, notes, terms_conditions, total_amount, signature_id, serializedInvoiceDetails, id],
            async (error, results) => {
                if (error) return reject(error);

                try {
                    for (const detail of invoice_details) {
                        const { product_id, subproduct_id, quantity } = detail;

                        if (subproduct_id > 0) {
                            await outStockSubProduct(subproduct_id, quantity);
                        } else {
                            await outStockProduct(product_id, quantity);
                        }
                    }
                } catch (stockError) {
                    return reject(stockError); // Reject if stock update fails
                }

                resolve(results); // Resolve with the original results if everything succeeds
            }
        );
    });
};

// Delete an invoice by ID
const deleteInvoice = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('DELETE FROM invoices WHERE id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getTotalAmountsByStatus = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            `SELECT 
                SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) AS total_paid_amount,
                SUM(CASE WHEN status = 'overdue' THEN total_amount ELSE 0 END) AS total_overdue_amount,
                SUM(CASE WHEN status = 'cancelled' THEN total_amount ELSE 0 END) AS total_cancelled_amount,
                SUM(CASE WHEN status = 'draft' THEN total_amount ELSE 0 END) AS total_draft_amount,
                SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) AS total_pending_amount,
                SUM(CASE WHEN status = 'partially_paid' THEN total_amount ELSE 0 END) AS total_partially_paid_amount,
                SUM(CASE WHEN status = 'unpaid' THEN total_amount ELSE 0 END) AS total_unpaid_amount,
                SUM(CASE WHEN status = 'refunded' THEN total_amount ELSE 0 END) AS total_refunded_amount,
                SUM(total_amount) AS total_all_statuses
            FROM invoices`,
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                const totals = {
                    total_paid_amount: results[0]?.total_paid_amount || 0,
                    total_overdue_amount: results[0]?.total_overdue_amount || 0,
                    total_cancelled_amount: results[0]?.total_cancelled_amount || 0,
                    total_draft_amount: results[0]?.total_draft_amount || 0,
                    total_pending_amount: results[0]?.total_pending_amount || 0,
                    total_partially_paid_amount: results[0]?.total_partially_paid_amount || 0,
                    total_unpaid_amount: results[0]?.total_unpaid_amount || 0,
                    total_refunded_amount: results[0]?.total_refunded_amount || 0,
                    total_all_statuses: results[0]?.total_all_statuses || 0
                };
                resolve(totals);
            }
        );
    });
};

module.exports = {
    generateInvoiceNumber,
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    getTotalInvoiceCount,
    getTotalAmountsByStatus,
    getInvoiceDetailsForPDF,
    updateInvoiceStatus
};

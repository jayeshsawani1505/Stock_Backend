const dbconnection = require('../config/database');

// Create a new vendor
const createVendorService = async (vendorData) => {
    const { vendor_name, email, phone_number, closing_balance } = vendorData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO vendors (vendor_name, email, phone_number, closing_balance) VALUES (?, ?, ?, ?)',
            [vendor_name, email, phone_number, closing_balance],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { vendorId: result.insertId };
};

// Get a vendor by ID
const getVendorService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM vendors WHERE vendor_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all vendors
const getVendorsService = async () => {
    try {
        const rows = await new Promise((resolve, reject) => {
            dbconnection.query(
                `
                SELECT 
                    vendors.*, 
                    COALESCE(SUM(purchases.total_amount), 0) AS total_amount 
                FROM 
                    vendors 
                LEFT JOIN 
                    purchases ON vendors.vendor_id = purchases.vendor_id 
                GROUP BY 
                    vendors.vendor_id 
                ORDER BY 
                    vendors.created_at DESC
                `,
                (error, results) => {
                    if (error) {
                        reject(error); // Reject with error to be handled in catch
                    } else {
                        resolve(results); // Resolve with query results
                    }
                }
            );
        });
        return rows;
    } catch (error) {
        console.error("Error fetching vendors: ", error);
        throw new Error('Could not fetch vendors');
    }
};

// Update a vendor by ID
const updateVendorService = async (id, vendorData) => {
    const { vendor_name, email, phone_number, closing_balance } = vendorData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE vendors SET vendor_name = ?, email = ?, phone_number = ?, closing_balance = ?, updated_at = CURRENT_TIMESTAMP WHERE vendor_id = ?',
            [vendor_name, email, phone_number, closing_balance, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...vendorData } : null;
};

// Delete a vendor by ID
const deleteVendorService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM vendors WHERE vendor_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0;
};

module.exports = {
    createVendorService,
    getVendorService,
    getVendorsService,
    updateVendorService,
    deleteVendorService
};

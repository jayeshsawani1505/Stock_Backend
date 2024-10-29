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
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM vendors',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
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

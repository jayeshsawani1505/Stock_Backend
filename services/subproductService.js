const dbconnection = require('../config/database');

// Create a new subproduct
const createSubproductService = async (subproductData) => {
    const { product_id, subproduct_name, subproduct_code, quantity, unit_price, units, description } = subproductData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO subproducts (product_id, subproduct_name, subproduct_code, quantity, unit_price, units, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [product_id, subproduct_name, subproduct_code, quantity, unit_price, units, description],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { subproductId: result.insertId };
};

// Get a subproduct by ID
const getSubproductService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM subproducts WHERE subproduct_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all subproducts
const getSubproductsService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM subproducts',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a subproduct by ID
const updateSubproductService = async (id, subproductData) => {
    const { product_id, subproduct_name, subproduct_code, quantity, unit_price, units, description } = subproductData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE subproducts SET product_id = ?, subproduct_name = ?, subproduct_code = ?, quantity = ?, unit_price = ?, units = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE subproduct_id = ?',
            [product_id, subproduct_name, subproduct_code, quantity, unit_price, units, description, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...subproductData } : null;
};

// Delete a subproduct by ID
const deleteSubproductService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM subproducts WHERE subproduct_id = ?',
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
    createSubproductService,
    getSubproductService,
    getSubproductsService,
    updateSubproductService,
    deleteSubproductService
};

const dbconnection = require('../config/database');

// Create a new product
const createProductService = async (productData) => {
    const { item_type, product_name, product_code, category_id, quantity, selling_price, purchase_price, units, alert_quantity, description, product_image } = productData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO products (item_type, product_name, product_code, category_id, quantity, selling_price, purchase_price, units, alert_quantity, description, product_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [item_type, product_name, product_code, category_id, quantity, selling_price, purchase_price, units, alert_quantity, description, product_image],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { productId: result.insertId };
};

// Get a product by ID
const getProductByID = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM products WHERE product_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all products
const getProductsService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            `SELECT products.*, category.category_name
             FROM products
             JOIN category ON products.category_id = category.category_id ORDER BY created_at DESC`,
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a product by ID
const updateProductService = async (id, productData) => {
    const { item_type, product_name, product_code, category_id, quantity, selling_price, purchase_price, units, alert_quantity, barcode_code, discount_type, tax, description, product_image } = productData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE products SET item_type = ?, product_name = ?, product_code = ?, category_id = ?, quantity = ?, selling_price = ?, purchase_price = ?, units = ?, alert_quantity = ?, barcode_code = ?, discount_type = ?, tax = ?, description = ?, product_image = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?',
            [item_type, product_name, product_code, category_id, quantity, selling_price, purchase_price, units, alert_quantity, barcode_code, discount_type, tax, description, product_image, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...productData } : null;
};

// Delete a product by ID
const deleteProductService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM products WHERE product_id = ?',
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
    createProductService,
    getProductByID,
    getProductsService,
    updateProductService,
    deleteProductService
};

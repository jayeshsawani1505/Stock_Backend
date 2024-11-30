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

const getProductsByCategoryId = async (categoryId) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            `SELECT products.*, category.category_name
             FROM products
             JOIN category ON products.category_id = category.category_id
             WHERE products.category_id = ?
             ORDER BY created_at DESC`,
            [categoryId], // Passing categoryId as a parameter to avoid SQL injection
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

const inStock = async (id, quantity) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE products SET quantity = quantity + ? WHERE product_id = ?',
            [quantity, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

const outStock = async (id, quantity) => {
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

const getFilteredProductsService = async (filters) => {
    try {
        const { categoryId, startDate, endDate } = filters;

        // Base SQL query
        let query = `
            SELECT products.*, category.category_name
            FROM products
            JOIN category ON products.category_id = category.category_id
        `;

        // Collect conditions and values for prepared statement
        const conditions = [];
        const values = [];

        if (categoryId) {
            conditions.push("products.category_id = ?");
            values.push(categoryId);
        }

        if (startDate) {
            conditions.push("products.created_at >= ?");
            values.push(startDate);
        }

        if (endDate) {
            conditions.push("products.created_at <= ?");
            values.push(endDate);
        }

        // Add WHERE clause if there are any conditions
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        // Add ORDER BY clause
        query += ` ORDER BY products.created_at DESC`;

        // Execute the query
        return new Promise((resolve, reject) => {
            dbconnection.query(query, values, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    } catch (error) {
        console.error("Error in getFilteredProductsService:", error);
        throw error;
    }
};

module.exports = {
    createProductService,
    getProductByID,
    getProductsService,
    updateProductService,
    deleteProductService,
    inStock, outStock,
    getProductsByCategoryId,
    getFilteredProductsService
};

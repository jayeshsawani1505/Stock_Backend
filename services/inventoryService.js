const dbconnection = require('../config/database');

// Create a new inventory item
const createInventoryItem = async (itemData) => {
    const { item_name, item_code, units, quantity, selling_price, purchase_price, status } = itemData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO inventory (item_name, item_code, units, quantity, selling_price, purchase_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [item_name, item_code, units, quantity, selling_price, purchase_price, status],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
            }
        );
    });
};

// Get all inventory items
const getAllInventoryItems = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM inventory', (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get an inventory item by ID
const getInventoryItemById = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM inventory WHERE inventory_id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Update an inventory item by ID
const updateInventoryItem = async (id, itemData) => {
    const { item_name, item_code, units, quantity, selling_price, purchase_price, status } = itemData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE inventory SET item_name = ?, item_code = ?, units = ?, quantity = ?, selling_price = ?, purchase_price = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE inventory_id = ?',
            [item_name, item_code, units, quantity, selling_price, purchase_price, status, id],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
            }
        );
    });
};

// Delete an inventory item by ID
const deleteInventoryItem = async (id) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('DELETE FROM inventory WHERE inventory_id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem
};

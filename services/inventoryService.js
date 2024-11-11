const dbconnection = require('../config/database');

// Create a new inventory item
const createInventoryItem = async (itemData) => {
    const { item_name, item_code, units, quantity, selling_price, purchase_price, status } = itemData;
    return new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO inventory (item_name, item_code, units, quantity, selling_price, purchase_price, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [item_name, item_code, units, quantity, selling_price, purchase_price, "default notes", status],
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
        dbconnection.query('SELECT * FROM inventory ORDER BY created_at DESC', (error, results) => {
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

// In-stock (Add to stock)
const inStock = async (id, quantity, note) => {
    return new Promise((resolve, reject) => {
        // Start transaction to ensure atomicity
        dbconnection.beginTransaction((transactionErr) => {
            if (transactionErr) return reject(transactionErr);

            // First, update the inventory quantity by adding the specified quantity
            dbconnection.query(
                'UPDATE inventory SET quantity = quantity + ? WHERE inventory_id = ?',
                [quantity, id],
                (error, results) => {
                    if (error) {
                        return dbconnection.rollback(() => reject(error));
                    }

                    // If quantity update is successful, update the notes
                    dbconnection.query(
                        'UPDATE inventory SET notes = ? WHERE inventory_id = ?',
                        [note, id],
                        (notesError) => {
                            if (notesError) {
                                return dbconnection.rollback(() => reject(notesError));
                            }

                            // Commit the transaction
                            dbconnection.commit((commitErr) => {
                                if (commitErr) {
                                    return dbconnection.rollback(() => reject(commitErr));
                                }
                                resolve(results);
                            });
                        }
                    );
                }
            );
        });
    });
};

// Out-stock (Remove from stock)
const outStock = async (id, quantity, note) => {
    return new Promise((resolve, reject) => {
        // Start transaction to ensure atomicity
        dbconnection.beginTransaction((transactionErr) => {
            if (transactionErr) return reject(transactionErr);

            // First, update the inventory quantity by subtracting the specified quantity
            dbconnection.query(
                'UPDATE inventory SET quantity = quantity - ? WHERE inventory_id = ? AND quantity >= ?',
                [quantity, id, quantity],
                (error, results) => {
                    if (error) {
                        return dbconnection.rollback(() => reject(error));
                    }
                    if (results.affectedRows === 0) {
                        return dbconnection.rollback(() => reject(new Error('Not enough stock available')));
                    }

                    // If quantity update is successful, update the notes
                    dbconnection.query(
                        'UPDATE inventory SET notes = ? WHERE inventory_id = ?',
                        [note, id],
                        (notesError) => {
                            if (notesError) {
                                return dbconnection.rollback(() => reject(notesError));
                            }

                            // Commit the transaction
                            dbconnection.commit((commitErr) => {
                                if (commitErr) {
                                    return dbconnection.rollback(() => reject(commitErr));
                                }
                                resolve(results);
                            });
                        }
                    );
                }
            );
        });
    });
};

module.exports = {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem,
    inStock, outStock,
};

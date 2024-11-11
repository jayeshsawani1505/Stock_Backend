const dbconnection = require('../config/database');

// Create a new category
const createCategoryService = async (categoryData) => {
    const { category_name, description } = categoryData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO category (category_name, description) VALUES (?, ?)',
            [category_name, description],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { categoryId: result.insertId };
};

// Get a category by ID
const getCategoryService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM category WHERE category_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all categories
const getCategoriesService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM category ORDER BY created_at DESC',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a category by ID
const updateCategoryService = async (id, categoryData) => {
    const { category_name, description } = categoryData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE category SET category_name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE category_id = ?',
            [category_name, description, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...categoryData } : null;
};

// Delete a category by ID
const deleteCategoryService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM category WHERE category_id = ?',
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
    createCategoryService,
    getCategoryService,
    getCategoriesService,
    updateCategoryService,
    deleteCategoryService
};

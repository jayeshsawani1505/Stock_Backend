const dbconnection = require('../config/database');

// Create a new expense
const createExpenseService = async (expenseData) => {
    const { reference, amount, payment_mode, expense_date, payment_status, description, attachment } = expenseData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO expenses (reference, amount, payment_mode, expense_date, payment_status, description, attachment) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [reference, amount, payment_mode, expense_date, payment_status, description, attachment],
            (error, results) => {
                if (error) reject(error);
                else resolve({ expenseId: results.insertId });
            }
        );
    });
    return result;
};

// Get an expense by ID
const getExpenseService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM expenses WHERE expense_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all expenses
const getExpensesService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM expenses ORDER BY created_at DESC',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update an expense by ID
const updateExpenseService = async (id, expenseData) => {
    const { reference, amount, payment_mode, expense_date, payment_status, description, attachment } = expenseData;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE expenses SET reference = ?, amount = ?, payment_mode = ?, expense_date = ?, payment_status = ?, description = ?, attachment = ?, updated_at = CURRENT_TIMESTAMP WHERE expense_id = ?',
            [reference, amount, payment_mode, expense_date, payment_status, description, attachment, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { id, ...expenseData } : null;
};

// Delete an expense by ID
const deleteExpenseService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM expenses WHERE expense_id = ?',
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
    createExpenseService,
    getExpenseService,
    getExpensesService,
    updateExpenseService,
    deleteExpenseService
};

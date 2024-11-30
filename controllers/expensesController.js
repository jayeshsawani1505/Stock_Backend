const ExpenseService = require('../services/expensesService');

// Create a new expense
const createExpense = async (req, res) => {
    try {
        const expenseData = req.body;
        if (req.file) {
            expenseData.attachment = `/uploads/expenses/${req.file.filename}`;
        }
        const result = await ExpenseService.createExpenseService(expenseData);
        res.status(201).json({
            message: "Expense created successfully with attachment.",
            expenseId: result.expenseId,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating expense with attachment: " + error.message,
        });
    }
};

// Retrieve all expenses
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseService.getExpensesService();
        res.status(200).json({
            message: "Expenses retrieved successfully.",
            data: expenses,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving expenses: " + error.message,
        });
    }
};

// Retrieve an expense by ID
const getExpenseById = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await ExpenseService.getExpenseService(id);
        if (expense) {
            res.status(200).json({
                message: "Expense retrieved successfully.",
                data: expense,
            });
        } else {
            res.status(404).json({
                message: "Expense not found.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving expense: " + error.message,
        });
    }
};

// Update an expense by ID
const updateExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expenseData = req.body;
        if (req.file) {
            expenseData.attachment = `/uploads/expenses/${req.file.filename}`;
        }
        const updatedExpense = await ExpenseService.updateExpenseService(id, expenseData);
        if (updatedExpense) {
            res.status(200).json({
                message: "Expense updated successfully.",
                data: updatedExpense,
            });
        } else {
            res.status(404).json({
                message: "Expense not found for update.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating expense: " + error.message,
        });
    }
};

// Delete an expense by ID
const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ExpenseService.deleteExpenseService(id);
        if (result) {
            res.status(200).json({
                message: "Expense deleted successfully.",
            });
        } else {
            res.status(404).json({
                message: "Expense not found for deletion.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting expense: " + error.message,
        });
    }
};

const getFilteredExpenses = async (req, res) => {
    try {
        const filters = req.query; // Get query parameters (startDate, endDate)
        const results = await ExpenseService.getFilteredExpensesService(filters);

        if (results.length === 0) {
            return res.status(404).json({ message: "No expenses found." });
        }

        res.status(200).json({ message: "Expenses retrieved successfully.", data: results });
    } catch (error) {
        console.error('Error in getFilteredExpenses controller:', error);
        res.status(500).json({ message: "Error retrieving expenses.", error });
    }
};

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getFilteredExpenses
};

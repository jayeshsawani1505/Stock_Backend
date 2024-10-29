const ExpenseService = require('../services/expensesService');

// Create a new expense
const createExpense = async (req, res) => {
    try {
        const expenseData = req.body;
        const result = await ExpenseService.createExpenseService(expenseData);
        res.status(201).json({
            message: "Expense created successfully.",
            expenseId: result.expenseId,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating expense: " + error.message,
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
        const updatedExpense = await ExpenseService.updateExpenseService(id, req.body);
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

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};

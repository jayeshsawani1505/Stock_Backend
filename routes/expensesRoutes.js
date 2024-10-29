const express = require('express');
const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require('../controllers/expensesController');

const router = express.Router();

// Create a new expense
router.post('/', createExpense);

// Retrieve all expenses
router.get('/', getAllExpenses);

// Retrieve an expense by ID
router.get('/:id', getExpenseById);

// Update an expense by ID
router.put('/:id', updateExpense);

// Delete an expense by ID
router.delete('/:id', deleteExpense);

module.exports = router;

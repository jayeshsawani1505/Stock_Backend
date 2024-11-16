const express = require('express');
const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require('../controllers/expensesController');

const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/expenses')); // Ensure 'uploads/expenses' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage });
// Create a new expense
router.post('/', upload.single('attachment'), createExpense);

// Retrieve all expenses
router.get('/', getAllExpenses);

// Retrieve an expense by ID
router.get('/:id', getExpenseById);

// Update an expense by ID
router.put('/:id', upload.single('attachment'), updateExpense);

// Delete an expense by ID
router.delete('/:id', deleteExpense);

module.exports = router;

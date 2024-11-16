const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Ensure 'uploads/customer' directory exists
const customerUploadsDir = path.join(__dirname, 'uploads/customer');
if (!fs.existsSync(customerUploadsDir)) {
    fs.mkdirSync(customerUploadsDir, { recursive: true });
}

// Ensure 'uploads/category' directory exists
const categoryUploadsDir = path.join(__dirname, 'uploads/category');
if (!fs.existsSync(categoryUploadsDir)) {
    fs.mkdirSync(categoryUploadsDir, { recursive: true });
}

// Ensure 'uploads/product' directory exists
const productUploadsDir = path.join(__dirname, 'uploads/product');
if (!fs.existsSync(productUploadsDir)) {
    fs.mkdirSync(productUploadsDir, { recursive: true });
}

// Ensure 'uploads/signature' directory exists
const signatureUploadsDir = path.join(__dirname, 'uploads/signature');
if (!fs.existsSync(signatureUploadsDir)) {
    fs.mkdirSync(signatureUploadsDir, { recursive: true });
}

// Ensure 'uploads/expenses' directory exists
const expensesUploadsDir = path.join(__dirname, 'uploads/expenses');
if (!fs.existsSync(expensesUploadsDir)) {
    fs.mkdirSync(expensesUploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const signatureRoutes = require('./routes/signatureRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const subproductRoutes = require('./routes/subproductRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const creditnoteinvoicesRoutes = require('./routes/creditNoteInvoiceRoutes');
const customersRoutes = require('./routes/customerRoutes');
const deliveryChallanRoutes = require('./routes/deliveryChallanRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const purchasesRoutes = require('./routes/purchasesRoutes');
const returnDebitNotesPurchasesRoutes = require('./routes/returnDebitNotesPurchasesRoutes');
const messageRoutes = require('./routes/messageRoutes');
const commonRoutes = require('./routes/commonRoutes');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/signatures', signatureRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subproducts', subproductRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/creditnoteinvoices', creditnoteinvoicesRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/delivery_challans', deliveryChallanRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/return-debit-notes-purchases', returnDebitNotesPurchasesRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/common', commonRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

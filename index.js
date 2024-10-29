const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

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
const creditNoteRoutes = require('./routes/creditNoteRoutes');
const signatureRoutes = require('./routes/signatureRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const subproductRoutes = require('./routes/subproductRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const quotationRoutes = require('./routes/quotationRoutes');


app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api/credit-notes', creditNoteRoutes);
app.use('/api/signatures', signatureRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subproducts', subproductRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/quotations', quotationRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();
const dbconnection = require('../config/database');

router.get('/chart-data', (req, res) => {
    const query = `
      SELECT category_name, COUNT(product_id) AS product_count
      FROM products
      JOIN category ON products.category_id = category.category_id
      GROUP BY category_name;
    `;

    dbconnection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            const chartData = results.map(row => ({
                label: row.category_name,
                value: row.product_count
            }));
            res.json(chartData);
        }
    });
});

router.get('/invoices/status-wise', (req, res) => {
    const query = `
      SELECT status, COUNT(*) AS invoice_count
      FROM invoices
      GROUP BY status;
    `;
    dbconnection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).send('Database query error');
        }
        res.json(results);
    });
});

module.exports = router;
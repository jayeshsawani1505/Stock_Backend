const dbconnection = require('../config/database');

// Create a new customer
const createCustomerService = async (customerData) => {
    const {
        profile_photo, name, currency, email, website, phone, notes, billing_name,
        billing_address_line1, billing_address_line2, billing_country, billing_state,
        billing_city, billing_pincode, shipping_name, shipping_address_line1,
        shipping_address_line2, shipping_country, shipping_state, shipping_city,
        shipping_pincode, bank_name, branch, account_number, account_holder_name, ifsc,
        opening_balance
    } = customerData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            `INSERT INTO customers 
            (profile_photo, name, currency, email, website, phone, notes, billing_name,
            billing_address_line1, billing_address_line2, billing_country, billing_state,
            billing_city, billing_pincode, shipping_name, shipping_address_line1, 
            shipping_address_line2, shipping_country, shipping_state, shipping_city,
            shipping_pincode, bank_name, branch, account_number, account_holder_name, ifsc,
            opening_balance) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                profile_photo, name, currency, email, website, phone, notes, billing_name,
                billing_address_line1, billing_address_line2, billing_country, billing_state,
                billing_city, billing_pincode, shipping_name, shipping_address_line1,
                shipping_address_line2, shipping_country, shipping_state, shipping_city,
                shipping_pincode, bank_name, branch, account_number, account_holder_name, ifsc, opening_balance
            ],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return { customerId: result.insertId };
};


// Get a customer by ID
const getCustomerService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM customers WHERE customer_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all customers ordered by created_at descending
const getCustomersService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            `
            SELECT 
                customers.*, 
                COALESCE(SUM(invoices.total_amount), 0) AS total_amount 
            FROM 
                customers 
            LEFT JOIN 
                invoices ON customers.customer_id = invoices.customer_id 
            GROUP BY 
                customers.customer_id 
            ORDER BY 
                customers.created_at DESC
            `,
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Get total customer count
const getTotalCustomerCount = async () => {
    const count = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT COUNT(*) AS total_customers FROM customers', // Get total count of customers
            (error, results) => {
                if (error) reject(error);
                else resolve(results[0].total_customers); // Resolving the total count from the first row
            }
        );
    });

    return count;
};

// Update a customer by ID
const updateCustomerService = async (id, customerData) => {
    const {
        opening_balance, name, currency, email, website, phone, notes, billing_name,
        billing_address_line1, billing_address_line2, billing_country, billing_state,
        billing_city, billing_pincode, shipping_name, shipping_address_line1,
        shipping_address_line2, shipping_country, shipping_state, shipping_city,
        shipping_pincode, bank_name, branch, account_number, account_holder_name, ifsc
    } = customerData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            `UPDATE customers SET 
            opening_balance = ?, name = ?, currency = ?, email = ?, website = ?, phone = ?, notes = ?, 
            billing_name = ?, billing_address_line1 = ?, billing_address_line2 = ?, 
            billing_country = ?, billing_state = ?, billing_city = ?, billing_pincode = ?, 
            shipping_name = ?, shipping_address_line1 = ?, shipping_address_line2 = ?, 
            shipping_country = ?, shipping_state = ?, shipping_city = ?, shipping_pincode = ?, 
            bank_name = ?, branch = ?, account_number = ?, account_holder_name = ?, ifsc = ?, 
            updated_at = CURRENT_TIMESTAMP WHERE customer_id = ?`,
            [
                opening_balance, name, currency, email, website, phone, notes, billing_name,
                billing_address_line1, billing_address_line2, billing_country, billing_state,
                billing_city, billing_pincode, shipping_name, shipping_address_line1,
                shipping_address_line2, shipping_country, shipping_state, shipping_city,
                shipping_pincode, bank_name, branch, account_number, account_holder_name, ifsc, id
            ],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0 ? { customerId: id, ...customerData } : null;
};

// Delete a customer by ID
const deleteCustomerService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM customers WHERE customer_id = ?',
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
    createCustomerService,
    getCustomerService,
    getTotalCustomerCount,
    getCustomersService,
    updateCustomerService,
    deleteCustomerService
};

const customerService = require('../services/customerService');
const xlsx = require('xlsx');

// Create a new customer
const createCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        const result = await customerService.createCustomerService(customerData);
        res.status(201).json({ message: 'Customer created successfully', customerId: result.customerId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer: ' + error.message });
    }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await customerService.getCustomerService(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer retrieved successfully', customer });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customer: ' + error.message });
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getCustomersService();
        res.status(200).json({ message: 'Customers retrieved successfully', customers });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customers: ' + error.message });
    }
};

const getCustomerCount = async (req, res) => {
    try {
        const totalCustomers = await customerService.getTotalCustomerCount();

        res.status(200).json({
            message: "Total customer count fetched successfully",
            totalCustomers
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch total customer count",
            error: error.message
        });
    }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await customerService.updateCustomerService(id, updatedData);
        if (!result) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer updated successfully', customer: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer: ' + error.message });
    }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await customerService.deleteCustomerService(id);
        if (!deleted) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer: ' + error.message });
    }
};
// Handle file upload and process Excel data
const uploadExcel = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Loop through the data and insert each record
        for (const row of jsonData) {
            const customerData = {
                profile_photo: row.profile_photo,
                name: row.name,
                currency: row.currency,
                email: row.email,
                website: row.website,
                phone: row.phone,
                notes: row.notes,
                billing_name: row.billing_name,
                billing_address_line1: row.billing_address_line1,
                billing_address_line2: row.billing_address_line2,
                billing_country: row.billing_country,
                billing_state: row.billing_state,
                billing_city: row.billing_city,
                billing_pincode: row.billing_pincode,
                shipping_name: row.shipping_name,
                shipping_address_line1: row.shipping_address_line1,
                shipping_address_line2: row.shipping_address_line2,
                shipping_country: row.shipping_country,
                shipping_state: row.shipping_state,
                shipping_city: row.shipping_city,
                shipping_pincode: row.shipping_pincode,
                bank_name: row.bank_name,
                branch: row.branch,
                account_number: row.account_number,
                account_holder_name: row.account_holder_name,
                ifsc: row.ifsc
            };

            // Call your service function to insert the data into the database
            await customerService.createCustomerService(customerData);
        }

        res.status(200).json({ message: 'Data uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process the Excel file' });
    }
};
module.exports = {
    createCustomer,
    getCustomerById,
    getCustomerCount,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    uploadExcel
};

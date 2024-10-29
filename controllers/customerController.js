const customerService = require('../services/customerService');

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

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
};

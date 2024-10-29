const vendorService = require('../services/vendorService');

const createVendor = async (req, res) => {
    try {
        const vendor = await vendorService.createVendorService(req.body);
        res.status(201).json({
            message: 'Vendor created successfully',
            vendor
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vendor: ' + error.message });
    }
};

const getVendorById = async (req, res) => {
    try {
        const vendor = await vendorService.getVendorService(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({
            message: 'Vendor retrieved successfully',
            vendor
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vendor: ' + error.message });
    }
};

const getAllVendors = async (req, res) => {
    try {
        const vendors = await vendorService.getVendorsService();
        res.status(200).json({
            message: 'Vendors retrieved successfully',
            vendors
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vendors: ' + error.message });
    }
};

const updateVendor = async (req, res) => {
    try {
        const updatedVendor = await vendorService.updateVendorService(req.params.id, req.body);
        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({
            message: 'Vendor updated successfully',
            updatedVendor
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update vendor: ' + error.message });
    }
};

const deleteVendor = async (req, res) => {
    try {
        const deleted = await vendorService.deleteVendorService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(204).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete vendor: ' + error.message });
    }
};

module.exports = {
    createVendor,
    getVendorById,
    getAllVendors,
    updateVendor,
    deleteVendor
};

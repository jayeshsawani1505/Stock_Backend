const vendorService = require('../services/vendorService');
const xlsx = require('xlsx');

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
const uploadExcel = async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read the uploaded Excel file
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const vendors = xlsx.utils.sheet_to_json(sheet);

        // Loop through each vendor data row and insert it
        for (const vendorData of vendors) {
            await vendorService.createVendorService(vendorData);
        }

        res.status(201).json({ message: 'Vendors uploaded and added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload vendors: ' + error.message });
    }
};
module.exports = {
    uploadExcel,
    createVendor,
    getVendorById,
    getAllVendors,
    updateVendor,
    deleteVendor
};

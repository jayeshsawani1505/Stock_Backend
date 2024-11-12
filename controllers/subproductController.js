const subproductService = require('../services/subproductService');

const createSubproduct = async (req, res) => {
    try {
        const subproduct = await subproductService.createSubproductService(req.body);
        res.status(201).json({
            message: 'Subproduct created successfully',
            subproduct
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create subproduct: ' + error.message });
    }
};

const getSubproductById = async (req, res) => {
    try {
        const subproduct = await subproductService.getSubproductService(req.params.id);
        if (!subproduct) {
            return res.status(404).json({ message: 'Subproduct not found' });
        }
        res.status(200).json({
            message: 'Subproduct retrieved successfully',
            subproduct
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve subproduct: ' + error.message });
    }
};

const getAllSubproducts = async (req, res) => {
    try {
        const subproducts = await subproductService.getSubproductsService();
        res.status(200).json({
            message: 'Subproducts retrieved successfully',
            subproducts
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve subproducts: ' + error.message });
    }
};

const getSubproductsByProductId = async (req, res) => {
    try {
        const { product_id } = req.params; // Get product_id from URL params
        const subproducts = await subproductService.getSubproductsByProductId(product_id);

        if (subproducts.length === 0) {
            return res.status(404).json({ message: 'No subproducts found for this product_id' });
        }

        res.status(200).json({
            message: 'Subproducts retrieved successfully',
            subproducts,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSubproduct = async (req, res) => {
    try {
        const updatedSubproduct = await subproductService.updateSubproductService(req.params.id, req.body);
        if (!updatedSubproduct) {
            return res.status(404).json({ message: 'Subproduct not found' });
        }
        res.status(200).json({
            message: 'Subproduct updated successfully',
            updatedSubproduct
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update subproduct: ' + error.message });
    }
};

const deleteSubproduct = async (req, res) => {
    try {
        const deleted = await subproductService.deleteSubproductService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Subproduct not found' });
        }
        res.status(204).json({ message: 'Subproduct deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete subproduct: ' + error.message });
    }
};

module.exports = {
    createSubproduct,
    getSubproductById,
    getAllSubproducts,
    updateSubproduct,
    deleteSubproduct,
    getSubproductsByProductId
};

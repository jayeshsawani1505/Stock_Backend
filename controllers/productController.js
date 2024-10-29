const productService = require('../services/productService');

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProductService(req.body);
        res.status(201).json({ 
            message: 'Product created successfully', 
            product 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product: ' + error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductService(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ 
            message: 'Product retrieved successfully', 
            product 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product: ' + error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getProductsService();
        res.status(200).json({ 
            message: 'Products retrieved successfully', 
            products 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products: ' + error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProductService(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ 
            message: 'Product updated successfully', 
            updatedProduct 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product: ' + error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProductService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product: ' + error.message });
    }
};

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
};

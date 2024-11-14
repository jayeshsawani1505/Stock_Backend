const productService = require('../services/productService');
const xlsx = require('xlsx');

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.product_image = `/uploads/product/${req.file.filename}`; // Store file path
        }
        const product = await productService.createProductService(productData);
        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create product: ' + error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductByID(req.params.id);
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
        const productId = req.params.id;
        const product = await productService.getProductByID(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedProductData = req.body;
        if (req.file) {
            updatedProductData.product_image = `/uploads/product/${req.file.filename}`;
        }
        const updatedProduct = await productService.updateProductService(productId, updatedProductData);
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
const uploadExcel = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Loop through the data and insert each record
        for (const row of jsonData) {
            const productData = {
                item_type: row.item_type,
                product_name: row.product_name,
                product_code: row.product_code,
                category_id: row.category_id,
                quantity: row.quantity,
                selling_price: row.selling_price,
                purchase_price: row.purchase_price,
                units: row.units,
                alert_quantity: row.alert_quantity,
                description: row.description
            };

            // Call the service function to insert the data into the database
            await productService.createProductService(productData);
        }

        res.status(200).json({ message: 'Products uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process the Excel file' });
    }
};
module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    uploadExcel
};

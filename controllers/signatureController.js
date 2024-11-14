// controllers/signatureController.js
const signatureService = require('../services/signatureService');

const createSignature = async (req, res) => {
    try {
        const signatureData = req.body;
        if (req.file) {
            signatureData.signature_photo = `/uploads/signature/${req.file.filename}`; // Store file path
        }
        const signature = await signatureService.createSignatureService(signatureData);
        res.status(201).json({
            message: 'Signature created successfully',
            signature
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create signature: ' + error.message
        });
    }
};

const getSignatureById = async (req, res) => {
    try {
        const signature = await signatureService.getSignatureService(req.params.id);
        if (!signature) {
            return res.status(404).json({ message: 'Signature not found' });
        }
        res.status(200).json({
            message: 'Signature retrieved successfully',
            signature
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve signature: ' + error.message });
    }
};

const getAllSignatures = async (req, res) => {
    try {
        const signatures = await signatureService.getSignaturesService();
        res.status(200).json({
            message: 'Signatures retrieved successfully',
            signatures
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve signatures: ' + error.message });
    }
};

const updateSignature = async (req, res) => {
    try {
        const signatureData = req.body;
        if (req.file) {
            signatureData.signature_photo = `/uploads/signature/${req.file.filename}`;
        }
        const updatedSignature = await signatureService.updateSignatureService(req.params.id, signatureData);
        if (!updatedSignature) {
            return res.status(404).json({ message: 'Signature not found' });
        }
        res.status(200).json({
            message: 'Signature updated successfully',
            updatedSignature
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to update signature: ' + error.message
        });
    }
};

const deleteSignature = async (req, res) => {
    try {
        const deleted = await signatureService.deleteSignatureService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Signature not found' });
        }
        res.status(204).json({ message: 'Signature deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete signature: ' + error.message });
    }
};

module.exports = {
    createSignature,
    getSignatureById,
    getAllSignatures,
    updateSignature,
    deleteSignature
};

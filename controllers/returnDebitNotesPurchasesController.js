const returnDebitNotesPurchasesService = require('../services/returnDebitNotesPurchasesService');

exports.createReturnDebitNote = async (req, res) => {
    try {
        const returnDebitNote = await returnDebitNotesPurchasesService.create(req.body);
        res.status(201).json({
            message: 'Return debit note created successfully',
            data: returnDebitNote
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating return debit note', error: error.message });
    }
};

exports.getAllReturnDebitNotes = async (req, res) => {
    try {
        const returnDebitNotes = await returnDebitNotesPurchasesService.getAll();
        res.status(200).json({
            message: 'Return debit notes retrieved successfully',
            data: returnDebitNotes
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving return debit notes', error: error.message });
    }
};

exports.getReturnDebitNoteById = async (req, res) => {
    try {
        const returnDebitNote = await returnDebitNotesPurchasesService.getById(req.params.id);
        if (returnDebitNote) {
            res.status(200).json({
                message: 'Return debit note retrieved successfully',
                data: returnDebitNote
            });
        } else {
            res.status(404).json({ message: 'Return debit note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving return debit note', error: error.message });
    }
};

exports.updateReturnDebitNote = async (req, res) => {
    try {
        const updatedReturnDebitNote = await returnDebitNotesPurchasesService.update(req.params.id, req.body);
        if (updatedReturnDebitNote) {
            res.status(200).json({
                message: 'Return debit note updated successfully',
                data: updatedReturnDebitNote
            });
        } else {
            res.status(404).json({ message: 'Return debit note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating return debit note', error: error.message });
    }
};

exports.deleteReturnDebitNote = async (req, res) => {
    try {
        const deleted = await returnDebitNotesPurchasesService.deleteReturnDebitNoteService(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Return debit note deleted successfully' });
        } else {
            res.status(404).json({ message: 'Return debit note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting return debit note', error: error.message });
    }
};

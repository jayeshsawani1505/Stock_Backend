// controllers/creditNoteController.js
const creditNoteService = require('../services/creditNoteService');

const createCreditNote = async (req, res) => {
    try {
        const creditNote = await creditNoteService.createCreditNoteService(req.body);
        res.status(201).json(creditNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCreditNoteById = async (req, res) => {
    try {
        const creditNote = await creditNoteService.getCreditNoteService(req.params.id);
        if (!creditNote) {
            return res.status(404).json({ message: 'Credit note not found' });
        }
        res.status(200).json(creditNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCreditNotes = async (req, res) => {
    try {
        const creditNotes = await creditNoteService.getCreditNotesService();
        res.status(200).json(creditNotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCreditNote = async (req, res) => {
    try {
        const updatedCreditNote = await creditNoteService.updateCreditNoteService(req.params.id, req.body);
        if (!updatedCreditNote) {
            return res.status(404).json({ message: 'Credit note not found' });
        }
        res.status(200).json(updatedCreditNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCreditNote = async (req, res) => {
    try {
        const deleted = await creditNoteService.deleteCreditNoteService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Credit note not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCreditNote,
    getCreditNoteById,
    getAllCreditNotes,
    updateCreditNote,
    deleteCreditNote
};

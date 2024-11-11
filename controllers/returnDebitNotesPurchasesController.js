const returnDebitNotesPurchasesService = require('../services/returnDebitNotesPurchasesService');
const xlsx = require('xlsx');

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
exports.uploadExcel = async (req, res) => {
    try {
        const filePath = req.file.path; // path to uploaded file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Loop through the JSON data and insert each record into the database
        for (const row of jsonData) {
            const debitNoteData = {
                vendor_id: row.vendor_id,
                purchase_order_date: row.purchase_order_date,
                due_date: row.due_date,
                reference_no: row.reference_no,
                product_id: row.product_id,
                quantity: row.quantity,
                rate: row.rate,
                notes: row.notes,
                terms_conditions: row.terms_conditions,
                total_amount: row.total_amount,
                signature_image: row.signature_image,
                payment_mode: row.payment_mode,
                status: row.status
            };

            // Insert each row using the service function
            await returnDebitNotesPurchasesService.create(debitNoteData);
        }

        res.status(200).json({ message: 'Return debit notes uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process the Excel file' });
    }
};

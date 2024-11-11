// services/signatureService.js
const dbconnection = require('../config/database');

// Create a new signature
const createSignatureService = async (signatureData) => {
    const { signature_name, signature_photo, status } = signatureData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'INSERT INTO signature (signature_name, signature_photo, status) VALUES (?, ?, ?)',
            [signature_name, signature_photo, status],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });

    return { signatureId: result.insertId };
};

// Get a signature by ID
const getSignatureService = async (id) => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM signature WHERE signature_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows[0];
};

// Get all signatures
const getSignaturesService = async () => {
    const rows = await new Promise((resolve, reject) => {
        dbconnection.query(
            'SELECT * FROM signature ORDER BY created_at DESC',
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return rows;
};

// Update a signature by ID
const updateSignatureService = async (id, signatureData) => {
    const { signature_name, signature_photo, status } = signatureData;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'UPDATE signature SET signature_name = ?, signature_photo = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE signature_id = ?',
            [signature_name, signature_photo, status, id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });

    return result.affectedRows > 0 ? { id, ...signatureData } : null;
};

// Delete a signature by ID
const deleteSignatureService = async (id) => {
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(
            'DELETE FROM signature WHERE signature_id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
    return result.affectedRows > 0;
};

module.exports = {
    createSignatureService,
    getSignatureService,
    getSignaturesService,
    updateSignatureService,
    deleteSignatureService
};

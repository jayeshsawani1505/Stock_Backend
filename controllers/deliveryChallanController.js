const deliveryChallanService = require('../services/deliveryChallanService');

const createDeliveryChallan = async (req, res) => {
    try {
        const deliveryChallanData = req.body;
        const result = await deliveryChallanService.createDeliveryChallanService(deliveryChallanData);
        res.status(201).json({
            message: "Delivery challan created successfully.",
            id: result.id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating delivery challan: " + error.message,
        });
    }
};


const getDeliveryChallans = async (req, res) => {
    try {
        const deliveryChallans = await deliveryChallanService.getDeliveryChallansService();
        res.status(200).json({
            message: "Delivery challans retrieved successfully.",
            data: deliveryChallans,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving delivery challans: " + error.message,
        });
    }
};

// Get generate DeliveryChallanNumber
const generateDeliveryChallanNumber = async (req, res) => {
    try {
        // Call the service to generate a new Delivery Challan number
        const newChallanNumber = await deliveryChallanService.generateDeliveryChallanNumber();

        // Send the response with the generated Delivery Challan number
        res.status(200).json({
            message: "Delivery Challan number generated successfully.",
            data: { Delivery_Challan_number: newChallanNumber }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error generating Delivery Challan number.",
            error: error.message
        });
    }
};

// Get Delivery Challan details by id for PDF
const getDeliveryChallanDetailsForPDF = async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await deliveryChallanService.getDeliveryChallanDetailsForPDF(id);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Delivery Challan not found." });
        }
        res.status(200).json({
            message: "Delivery Challan retrieved successfully.",
            data: rows[0], // Include the record
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving delivery challan.", error });
    }
};

const getDeliveryChallanById = async (req, res) => {
    const { id } = req.params;
    try {
        const deliveryChallan = await deliveryChallanService.getDeliveryChallanService(id);
        if (deliveryChallan) {
            res.status(200).json({
                message: "Delivery challan retrieved successfully.",
                data: deliveryChallan,
            });
        } else {
            res.status(404).json({
                message: "Delivery challan not found.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving delivery challan: " + error.message,
        });
    }
};


const updateDeliveryChallan = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedChallan = await deliveryChallanService.updateDeliveryChallanService(id, req.body);
        if (updatedChallan) {
            res.status(200).json({
                message: "Delivery challan updated successfully.",
                data: updatedChallan,
            });
        } else {
            res.status(404).json({
                message: "Delivery challan not found for update.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating delivery challan: " + error.message,
        });
    }
};


const deleteDeliveryChallan = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deliveryChallanService.deleteDeliveryChallanService(id);
        if (result) {
            res.status(200).json({
                message: "Delivery challan deleted successfully.",
            });
        } else {
            res.status(404).json({
                message: "Delivery challan not found for deletion.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting delivery challan: " + error.message,
        });
    }
};

module.exports = {
    createDeliveryChallan,
    getDeliveryChallanDetailsForPDF,
    getDeliveryChallans,
    getDeliveryChallanById,
    updateDeliveryChallan,
    deleteDeliveryChallan,
    generateDeliveryChallanNumber
}
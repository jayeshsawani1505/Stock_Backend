const express = require('express');
const router = express.Router();
const deliveryChallanController = require('../controllers/deliveryChallanController');

router.post('/', deliveryChallanController.createDeliveryChallan);
router.get('/', deliveryChallanController.getDeliveryChallans);
router.get('/generateDeliveryChallanNumber', deliveryChallanController.generateDeliveryChallanNumber);
router.get('/pdf/:id', deliveryChallanController.getDeliveryChallanDetailsForPDF);
router.get('/:id', deliveryChallanController.getDeliveryChallanById);
router.put('/:id', deliveryChallanController.updateDeliveryChallan);
router.delete('/:id', deliveryChallanController.deleteDeliveryChallan);

module.exports = router;

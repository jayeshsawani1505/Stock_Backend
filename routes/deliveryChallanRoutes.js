const express = require('express');
const router = express.Router();
const deliveryChallanController = require('../controllers/deliveryChallanController');

router.post('/', deliveryChallanController.createDeliveryChallan);
router.get('/', deliveryChallanController.getDeliveryChallans);
router.get('/:id', deliveryChallanController.getDeliveryChallanById);
router.put('/:id', deliveryChallanController.updateDeliveryChallan);
router.delete('/:id', deliveryChallanController.deleteDeliveryChallan);

module.exports = router;

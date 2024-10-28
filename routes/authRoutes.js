const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.userLogin);
router.post('/modifyPassword', authController.modifyPassword);
// router.get('/:id', userController.getUserById);
router.post('/CreateUser', authController.createUserHandler);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.DeleteUser);

module.exports = router;
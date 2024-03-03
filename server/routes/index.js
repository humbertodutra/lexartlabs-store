const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// User Routes
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);


// Products Routes
// router.post('/products/add', productController.addProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require('../controllers/productController');

// User Routes

router.post('/users/verifyToken', userController.verifyToken);
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

router.use(authMiddleware.verifyToken);

// Products Routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products/add', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;

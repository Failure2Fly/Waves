const express = require('express');
const productsController = require('../controllers/products.controller');
const router = express.Router();


router.post('/addProduct', productsController.addProduct);

module.exports = router;
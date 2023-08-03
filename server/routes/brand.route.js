const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { auth } = require('../middleware/auth');


router.post('/brand', auth( 'createAny', 'brand'), brandController.addBrand) 



module.exports = router;
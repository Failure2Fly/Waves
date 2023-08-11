const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { auth } = require('../middleware/auth');


router.post('/brand', auth( 'createAny', 'brand'), brandController.addBrand)

router.get('/all', brandController.getAllBrands)


router.route('/brand/:id')
.get( brandController.getBrand)
.delete( auth('deleteAny', 'brand'), brandController.deleteBrand)



module.exports = router;
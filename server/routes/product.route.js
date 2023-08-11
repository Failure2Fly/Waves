const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { auth } = require('../middleware/auth');
const { addProductValidation } = require('../middleware/validations');


router.post('/addProduct', auth('createAny', 'product'), addProductValidation, productsController.addProduct);
// router.get('/getProduct', productsController.getProduct);

router.route('/product/:id')
.get(productsController.getProductById)
.patch(auth('updateAny', 'product'),  productsController.updateProductById)
.delete(auth('deleteAny', 'product'), productsController.deleteProductById);

router.get('/all', productsController.allProducts);

router.post('/paginate/all', productsController.paginateProducts)

module.exports = router;
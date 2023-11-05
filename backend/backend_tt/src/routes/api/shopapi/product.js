// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../../../controllers/shop/product');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
// Search route
router.get('/search', productController.searchProducts);

module.exports = router;

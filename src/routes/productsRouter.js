const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/shopping-cart', productsController.shoppingCart);
router.get('/productDetail', productsController.productDetail);
router.get('/edit', productsController.edit);

module.exports = router;
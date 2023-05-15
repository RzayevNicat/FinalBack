const express = require('express');
const { postProduct, deleteProduct, getProducts, updateProducts, getById } = require('../controllers/products');
const { errorTest } = require('../controllers/products');

const router = express.Router();

router.post('/products', postProduct);
router.get('/error', errorTest);
router.get('/products', getProducts);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProducts);
router.get('/products/:id', getById);
module.exports = router;

const express = require('express');
const products = require('./products');
const auth = require('./auth');
const filter = require('./filter');
const users = require('./users');
const customers = require('./customers');
const router = express.Router();

router.use('/', products);
router.use('/', auth);
router.use('/', filter);
router.use('/', users);
router.use('/', customers);
module.exports = router;

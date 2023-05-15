const express = require('express');
const router = express.Router();
const { getCustomers, getById, updateCustomer, postCustomer, deleteCustomer } = require('../controllers/customers');
router.post('/customers', postCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:id', getById);
router.delete('/customers/:id', deleteCustomer);
router.put('/customers/:id', updateCustomer);

module.exports = router;

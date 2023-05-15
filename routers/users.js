const express = require('express');
const router = express.Router();
const { getAllUser, getUser, deleteUser, updateUser } = require('../controllers/users');
router.get('/users', getAllUser);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

module.exports = router;

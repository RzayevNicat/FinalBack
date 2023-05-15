const express = require('express');
const { postFilter, getFilter, deleteFilter } = require('../controllers/filter');
const { errorTest } = require('../controllers/filter');

const router = express.Router();

router.post('/filters', postFilter);
router.get('/filters', getFilter);
router.get('/error', errorTest);
router.delete('/filters/:id', deleteFilter);
module.exports = router;

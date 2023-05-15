const express = require('express');
const { postUser, login, logout, forgatPassword, resetPassword, getUserr } = require('../controllers/auth');
const router = express.Router();
const { getAccessToRoute } = require('../middlewares/authh/auth');
router.post('/auth', postUser);
router.post('/login', login);
router.post('/forgatpassword', forgatPassword);
router.put('/resetpassword', resetPassword);
router.get('/profile', getAccessToRoute, getUserr);
router.get('/logout', getAccessToRoute, logout);

module.exports = router;

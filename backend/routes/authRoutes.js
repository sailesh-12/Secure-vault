const express = require('express');
const router = express.Router();
const { signup, login,logout } = require('../controllers/authController.js');
const { verifyOtp } = require('../controllers/verifyOtp.js');

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout);
// Additional routes can be added here in the future

module.exports = router;

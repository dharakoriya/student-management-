const express = require('express');
// const { signup, login,loginWithMobile } = require('../controllers/userController');
const userController = require("../Controllers/userController");
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login); // This should now be defined
router.post('/login-mobile', userController.loginWithMobile);
// router.post('/login-mobileOTP', userController.loginWithOTP);
// router.post('/login-verifyOTP', userController.verifyOTP);

router.post('/login-sendOtpToEmail', userController.sendOtpToEmail);
router.post('/login-verifyEmailOtp', userController.verifyEmailOtp);

module.exports = router;

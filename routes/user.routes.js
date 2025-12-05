const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');


router.post('/loginUser', userController.insertUser);

router.post('/userProfile', userController.insertUserProfile);

router.get('/getUserProfile', userController.getUserProfileById);

router.post('/verifyOTP',userController.verifyUserOTP);




module.exports = router;
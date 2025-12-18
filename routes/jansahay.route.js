const express = require('express');
const router = express.Router();

const chatController = require('../controller/jansahay.controller');

router.get('/jansahay', chatController.chatWithJanSahay);

router.get('/chatHistory', chatController.chatHistory);

module.exports = router;

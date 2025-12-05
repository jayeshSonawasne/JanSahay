const express = require('express');
const router = express.Router();
const model = require('../controller/aiChat.controller');

// Use query parameter instead of route parameter

router.get('/chat', model.chatWithAI);

module.exports = router;
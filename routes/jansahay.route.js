const express = require('express');
const router = express.Router();

const chatWithJanSahay = require('../controller/jansahay.controller');

router.get('/jansahay', chatWithJanSahay);

module.exports = router;
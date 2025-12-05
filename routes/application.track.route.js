const express = require('express');
const router = express.Router();

const application = require('../controller/aplication.track.controller');

router.get('/trackApllication', application.trackApplication);
router.post('/applyScheme', application.trackApplication);

module.exports = router;
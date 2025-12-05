const express = require('express');
const router = express.Router();

const schemeController = require('../controller/scheme.controller');
const uploadPDF = require('../middlewares/upload.middleware');

// Feed Data To AI Model
router.post('/uploadScheme', uploadPDF.single("pdf"), schemeController.uploadScheme);

router.get('/getAllSchemes',schemeController.getAllSchemes);


module.exports = router;
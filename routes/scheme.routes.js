const express = require('express');
const router = express.Router();

const schemeController = require('../controller/scheme.controller');
const uploadPDF = require('../middlewares/upload.middleware');

// Feed Data To AI Model
router.post('/uploadScheme', uploadPDF.single("pdf"), schemeController.uploadScheme);

router.get('/getAllSchemes', schemeController.getAllSchemes);

router.post('/applyForScheme', schemeController.ApplyForScheme);

router.get('/getAllAppliedScheme', schemeController.getAllAppliedScheme);

router.post('/checkEligibility', schemeController.checkEligibility);

router.get('/savedSchemes', schemeController.savedSchemes);


module.exports = router;
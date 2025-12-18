const schemeModel = require('../models/scheme.model');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const pdf = require('pdf-parse');

const getAllSchemes = async (req, res) => {
  try {
    // Assuming schemeModel.find() is an async operation (like MongoDB/Mongoose)
    let allSchemes = await schemeModel.find();

    if (allSchemes && allSchemes.length > 0) {
      res.status(200).send({
        status: true,
        data: allSchemes,
        message: 'Schemes retrieved successfully'
      });
    } else {
      res.status(404).send({
        status: false,
        data: [],
        message: 'No schemes found'
      });
    }

  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).send({
      status: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

const uploadScheme = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).send({ status: false, message: 'No file provided' });
    }

    // Build paths (use path.join to avoid path mistakes)
    const pdfPath = path.join(__dirname, '..', 'public', 'pdf', req.file.filename);
    const txtDir = path.join(__dirname, '..', 'public', 'text files');

    // Read PDF buffer
    const dataBuffer = await fsp.readFile(pdfPath);

    // Parse PDF (pdf-parse returns a Promise)
    const data = await pdf(dataBuffer);

    const txtName = 'AiFeed' + '.txt';
    const txtPath = path.join(txtDir, txtName);

    let oldData = '';

    try {
      oldData = await fsp.readFile(txtPath, 'utf8');
    } catch (err) {
      oldData = '';   // file doesn't exist — start with empty
    }

    const newData = oldData + '\n\n [ **************Scheme Start************* ]' + (data.text + '\n\n [ **************Scheme End************* ]' || '');
    const fileName = path.join(txtDir, 'tempt_pdf_data.txt');
    await fsp.writeFile(fileName, data.text, 'utf8');

    const insertSchemeUsingAI = require("../controller/insert.scheme.controller");

    (async () => {
      const text = fs.readFileSync(fileName, "utf8");
      const result = await insertSchemeUsingAI(text);
    })();

    await fsp.writeFile(txtPath, newData, 'utf8');

    // Success - respond AFTER file saved
    return res.status(200).send({
      status: true,
      message: 'PDF uploaded and text saved successfully',
      file: req.file,
      textFile: `/public/text files/${txtName}`
    });
  } catch (error) {
    console.error('uploadFile error:', error);
    return res.status(500).send({
      status: false,
      message: 'Upload failed',
      error: error.message
    });
  }
};

const ApplyForScheme = async (req, res) => {
  try {
    let { refUser, refSchemeId, userName, email, dateOfBirth, mobileNumber, gender, category, aadharNumber, panNumber, address, city, state, pincode, aadharCardLink, panCardLink, incomeCertificateLink, addressProofLink, passportSizePhotoLink, isAknowledgementSent, isApplicationSubmitted } = req.body;

    let appliedScheme = new appliedSchemeSchema({
      refUser,
      refSchemeId,
      userName,
      email,
      dateOfBirth,
      mobileNumber,
      gender,
      category,
      aadharNumber,
      panNumber,
      address,
      city,
      state,
      pincode,
      aadharCardLink,
      panCardLink,
      incomeCertificateLink,
      addressProofLink,
      passportSizePhotoLink,
      isAknowledgementSent,
      isApplicationSubmitted
    });

    let isSchemeSave = await appliedScheme.save();
    if (isSchemeSave) {
      return res.status(200).send({
        status: true,
        message: 'Scheme applied successfully',
        data: isSchemeSave
      });
    } else {
      return res.status(400).send({
        status: false,
        message: 'Scheme applied failed',
        data: appliedScheme
      });
    }

  } catch (error) {
    return res.status(500).send({
      status: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

const checkEligibility = async (req, res) => {
  try {
    const { age, gender, income, occupation, state } = req.body;

    const eligibleSchemes = await schemeSchema.find({
      age: { $regex: age, $options: 'i' },
      gender: { $regex: gender, $options: 'i' },
      income: { $regex: income, $options: 'i' },
      occupation: { $regex: occupation, $options: 'i' },
      state: { $regex: state, $options: 'i' }
    });

    if (eligibleSchemes && eligibleSchemes.length > 0) {
      return res.status(200).send({
        status: true,
        message: 'Eligible schemes found',
        data: eligibleSchemes
      });
    } else {
      return res.status(404).send({
        status: false,
        message: 'No eligible schemes found for the provided criteria',
        data: []
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const savedSchemes = async (req, res) => {
  try {
    let refUser = req.query.refUser;
    const savedSchemes = await schemeSchema.find({ refUser: refUser });
    if (savedSchemes && savedSchemes.length > 0) {
      return res.status(200).send({
        status: true,
        message: 'Saved schemes found',
        data: savedSchemes
      });
    } else {
      return res.status(404).send({
        status: false,
        message: 'No saved schemes found',
        data: []
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: 'Internal server error',
      data: []
    });
  }
};

const getAllAppliedScheme = async (req, res) => {
  try {
    let refUser = req.query.refUser;
    const allAppliedScheme = await appliedSchemeSchema.find({ refUser: refUser });
    if (allAppliedScheme && allAppliedScheme.length > 0) {
      return res.status(200).send({
        status: true,
        message: 'All applied schemes found',
        data: allAppliedScheme
      });
    } else {
      return res.status(404).send({
        status: false,
        message: 'No applied schemes found',
        data: []
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: 'Internal server error',
      data: []
    });
  }
};
module.exports = { getAllSchemes, uploadScheme, ApplyForScheme, checkEligibility, savedSchemes, getAllAppliedScheme };
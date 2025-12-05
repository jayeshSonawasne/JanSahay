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
module.exports = { getAllSchemes, uploadScheme };
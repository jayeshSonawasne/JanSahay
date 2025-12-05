// models/Scheme.js
const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({

    // Basic Information
    schemeName: {
        type: String,
        unique: true,  
        trim: true
        // required: true
    },

    description: {
        type: String,
        trim: true
        // required: true
    },

    // Benefits Section
    benefits: {
        type: String,
        trim: true
        // required: true
    },

    eligibility: {
        type: String,
        trim: true
        // required: true
    },

    // Eligibility split into Rural + Urban + Exclusions
    eligibilityRural: {
        type: String,
        trim: true
        // required: true
    },

    eligibilityUrban: {
        type: String,
        trim: true
        // required: true
    },

    exclusions: {
        type: String,
        trim: true
        // required: true
    },

    // Application Process
    applicationProcess: {
        type: String,
        trim: true
        // required: true
    },

    // Required Documents
    documentsRequired: {
        type: String,
        trim: true
        // required: trues
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Scheme', schemeSchema);

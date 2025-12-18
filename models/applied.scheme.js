const mongoose = require("mongoose");

const appliedSchemeSchema = new mongoose.Schema({
    refUser: {
        type: String,
        required: true
    },
    refSchemeId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    aadharCardLink: {
        type: String,
        required: true
    },
    panCardLink: {
        type: String,
        required: true
    },
    incomeCertificateLink: {
        type: String,
        required: true
    },
    addressProofLink: {
        type: String,
        required: true
    },
    passportSizePhotoLink: {
        type: String,
        required: true
    },
    isAknowledgementSent: {
        type: Boolean,
        required: true
    },
    isApplicationSubmitted: {
        type: Boolean,
        required: true
    },

});

module.exports = mongoose.model("AppliedScheme", appliedSchemeSchema);

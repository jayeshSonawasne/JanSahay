// models/Scheme.js
const mongoose = require('mongoose');

const TrackApplicationSchema = new mongoose.Schema({
    refUserId: {
        type: String,
        default: ''
    },
    schemeName: {
        type: String,
        default: ''
    },
    ApplicationId: {
        type: String,
        default: false
    },
    discovery: {
        type: Boolean,
        default: false
    },
    elegibility: {
        type: String,
        default: false
    },
    applied: {
        type: Boolean,
        default: false
    },
    inProcess: {
        type: Boolean,
        default: false
    },
    closed: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('TrackApplication', TrackApplicationSchema);
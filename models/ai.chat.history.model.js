// models/Scheme.js
const mongoose = require('mongoose');

const aiChatHistory = new mongoose.Schema({
    refUser: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('chatHistory', aiChatHistory);
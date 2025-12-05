const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    refUser: {
        type: String,
        unique: true
    },
    leadId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    mobile: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    category: {
        type: String,
    },
    state: {
        type: String,
    },
    area: {
        type: String,
        enum: ["Rural", "Urban"],
    },
    education: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);

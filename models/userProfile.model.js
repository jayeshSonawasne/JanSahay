const mongoose = require("mongoose");

const userProfile = new mongoose.Schema(
    {
        refUserId: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["Male", "Female","male","female", "Other"],
        },

        dateOfBirth: {
            type: Date,
        },

        state: {
            type: String,
        },

        areaOfResidence: {
            type: String,
            enum: ["Urban", "Rural"],
        },

        caste: {
            type: String,
        },

        disabilities: {
            type: Boolean,
        },

        educationLevel: {
            type: String,
        },

        employmentStatus: {
            type: String,
        },

        annualFamilyIncome: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("userProfile", userProfile);
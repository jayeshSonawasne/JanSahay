const multer = require("multer");

// Function to convert "ladki bahin yojana.pdf" → "LBY.pdf"
function makeAcronym(filename) {
    const nameOnly = filename.replace(/\.[^/.]+$/, ""); // remove extension
    const words = nameOnly.split(/\s+/);                // split by space
    const acronym = words.map(w => w[0].toUpperCase()).join(""); // take first letters
    return acronym + ".pdf";
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/pdf/");
    },
    filename: function (req, file, cb) {

        // Convert original filename → acronym
        const shortName = makeAcronym(file.originalname);

        cb(null, shortName); // save as "LBY.pdf"
    }
});

// Only allow PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files allowed"), false);
    }
};

module.exports = multer({ storage, fileFilter });

const mongoose = require('mongoose');

// Define the Contact Us schema
const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;

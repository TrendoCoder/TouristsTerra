const express = require("express");
const ContactUs = require('../../models/contactus/contactus');

const createContactUs = async (req, res, next) => {
  const newContactUs = new ContactUs(req.body);
  try {
    const savedContactUs = await newContactUs.save();
    res.status(200).json(savedContactUs);
  } catch (err) {
    console.error('Error saving contact us:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.createContactUs = createContactUs;


const getContactUs = async (req, res, next) => {
  try {
    const contactUsEntries = await ContactUs.find();
    res.status(200).json(contactUsEntries);
  } catch (err) {
    console.error('Error fetching contact us entries:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports.getContactUs = getContactUs;
const deleteContactUs = async (req, res, next) => {
  const contactUsId = req.params.id;
  try {
    const deletedContactUs = await ContactUs.findByIdAndDelete(contactUsId);
    if (!deletedContactUs) {
      return res.status(404).json({ message: 'Contact Us entry not found' });
    }
    res.status(200).json({ message: 'Contact Us entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact us entry:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports.deleteContactUs = deleteContactUs;




const ContactUs = require('../../models/contactus/contactus');
const saveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new ContactUs({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  saveContact,
};

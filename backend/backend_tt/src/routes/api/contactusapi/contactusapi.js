const express = require("express");
const router = express.Router();
const contactuscontroller = require("../../../controllers/contactus/contactuscontroller");

router.post('/', contactuscontroller.saveContact);

module.exports = router;

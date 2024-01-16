const express = require("express");
const router = express.Router();
const contactuscontroller = require("../../../controllers/contactus/contactuscontroller");
router.post('/', contactuscontroller.createContactUs);
router.get('/', contactuscontroller.getContactUs);
router.delete('/:id', contactuscontroller.deleteContactUs);
module.exports = router;

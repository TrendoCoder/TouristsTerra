const express = require("express");
const { verifyAdmin } = require("../../../utils/verifytoken");
const { newMessage, getMessage } = require("../../../controllers/usermessenger/message");
const router = express.Router();

router.post("/",newMessage);
router.get("/:conversationId",getMessage);
module.exports = router;

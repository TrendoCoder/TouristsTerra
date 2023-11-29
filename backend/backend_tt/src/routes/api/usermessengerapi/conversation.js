const express = require("express");
const { verifyAdmin } = require("../../../utils/verifytoken");
const { newConversation, getConversation } = require("../../../controllers/usermessenger/conversation");
const router = express.Router();

//new Conversation
router.post("/", newConversation);
//get Conversation
router.get("/:userId",getConversation);

module.exports = router;

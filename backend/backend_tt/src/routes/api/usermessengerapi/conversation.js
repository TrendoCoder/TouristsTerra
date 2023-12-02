const express = require("express");
const { verifyAdmin } = require("../../../utils/verifytoken");
const { newConversation, getConversation, getConvIncludesTwoUserId } = require("../../../controllers/usermessenger/conversation");
const router = express.Router();
//new Conversation
router.post("/", newConversation);
//get Conversation
router.get("/:userId",getConversation);
//get conversation includes two userId
router.get("/find/:firstUserId/:secondUserId",getConvIncludesTwoUserId);

module.exports = router;

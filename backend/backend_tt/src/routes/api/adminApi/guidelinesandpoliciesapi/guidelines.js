const express = require("express");
const { createGuidelines, getGuidelines, updateGuidelines } = require("../../../../controllers/adminController/guideLinesAndPolicies/guidelines");
const router = express.Router();

// Create
router.post("/", createGuidelines);
// router.post("/:hotelId",verifyAdmin, createRoom);
router.get("/", getGuidelines);
router.put("/:id", updateGuidelines);

module.exports = router;

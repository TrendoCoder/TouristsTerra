const express = require("express");
const { verifyAdmin } = require("../../../utils/verifytoken");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom } = require("../../../controllers/hotel/room");
const router = express.Router();

// Create
router.post("/:hotelId",verifyAdmin, createRoom);

// Update
router.put("/:id",verifyAdmin, updateRoom);

// Delete
router.delete("/:id/:hotelId",verifyAdmin, deleteRoom);

// Get
router.get("/:id", getRoom);

// Get All
router.get("/", getAllRoom);

module.exports = router;

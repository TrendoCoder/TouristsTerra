const express = require("express");
const { verifyAdmin } = require("../../../utils/verifytoken");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom, updateRoomAvailability } = require("../../../controllers/hotel/room");
const router = express.Router();

// Create
router.post("/:hotelId", createRoom);
// router.post("/:hotelId",verifyAdmin, createRoom);

// Update
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete
router.delete("/:id/:hotelId", deleteRoom);
// router.delete("/:id/:hotelId",verifyAdmin, deleteRoom);

// Get
router.get("/:id", getRoom);

// Get All
router.get("/", getAllRoom);

module.exports = router;

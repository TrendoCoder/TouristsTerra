const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
} = require("../../../controllers/hotel/hotel");

const router = express.Router();

// Create
router.post("/", createHotel);

// Update
router.put("/:id", updateHotel);

// Delete
router.delete("/:id", deleteHotel);

// Get
router.get("/:id", getHotel);

// Get All
router.get("/", getAllHotel);

module.exports = router;

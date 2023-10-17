const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
} = require("../../../controllers/hotel/hotel");
const { verifyAdmin } = require("../../../utils/verifytoken");

const router = express.Router();

// Create
router.post("/",verifyAdmin, createHotel);

// Update
router.put("/:id",verifyAdmin, updateHotel);

// Delete
router.delete("/:id",verifyAdmin, deleteHotel);

// Get
router.get("/:id", getHotel);

// Get All
router.get("/", getAllHotel);

module.exports = router;

const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../../../controllers/hotel/hotel");
const { verifyAdmin } = require("../../../utils/verifytoken");

const router = express.Router();

// Create
router.post("/", createHotel);
// router.post("/",verifyAdmin, createHotel);

// Update
router.put("/:id",verifyAdmin, updateHotel);

// Delete
router.delete("/:id",verifyAdmin, deleteHotel);

// Get
router.get("/find/:id", getHotel);

// Get All
router.get("/", getAllHotel);

router.get("/countByCity", countByCity );

router.get("/countByType", countByType);

router.get("/rooms/:id",getHotelRooms);
module.exports = router;

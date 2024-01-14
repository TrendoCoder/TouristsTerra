// routes/shop/bookingHistoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  addBookingToHistory_1,
  getBookingHistoryByUserId_1,
  deleteBookingHistory_1,
} = require("../../../controllers/transport/bookingHistory");

router.post("/add-booking", addBookingToHistory_1);
router.get("/get-booking-history/:userId", getBookingHistoryByUserId_1);
router.delete("/delete-booking/:bookingId", deleteBookingHistory_1);

module.exports = router;

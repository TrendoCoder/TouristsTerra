// routes/shop/bookingHistoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  addBookingToHistory,
  getBookingHistoryByUserId,
  deleteBookingHistory,
} = require("../../../controllers/localguide/bookingHistory");

router.post("/add-booking", addBookingToHistory);
router.get("/get-booking-history/:userId", getBookingHistoryByUserId);
router.delete("/delete-booking/:bookingId", deleteBookingHistory);

module.exports = router;


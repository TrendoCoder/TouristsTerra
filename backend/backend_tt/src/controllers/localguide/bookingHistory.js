// controllers/shop/bookingHistoryController.js
const mongoose = require("mongoose");
const BookingHistory = require("../../models/localguide/bookingHistory");
const { User } = require("../../models/userlogin/user");
const Details = require("../../models/localguide/details");
const addBookingToHistory = async (req, res) => {
  try {
    const { userId, guideId, startDate, endDate, price } = req.body;

    
    console.log(req.body);
    const booking = new BookingHistory({
      userId,
      guideId,
      startDate,
      endDate,
      price,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookingHistoryByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const bookingHistory = await BookingHistory.find({
      userId: userId,
    }).populate("guideId");

    res.status(200).json(bookingHistory);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteBookingHistory = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    await BookingHistory.findByIdAndRemove(bookingId);
    res.status(200).json({ message: "Booking history deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { addBookingToHistory, getBookingHistoryByUserId, deleteBookingHistory };

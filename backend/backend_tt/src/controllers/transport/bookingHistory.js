// controllers/shop/bookingHistoryController.js
const mongoose = require("mongoose");
const BookingHistory = require("../../models/transport/bookingHistory");
const { User } = require("../../models/userlogin/user");

const addBookingToHistory_1 = async (req, res) => {
  try {
    const { userId, transportId, startDate, endDate, price } = req.body;

    // Check for overlapping bookings
    const overlappingBooking = await TransportBookingHistory.findOne({
      transportId,
      $or: [
        {
          startDate: { $lt: endDate },
          endDate: { $gt: startDate },
        },
      ],
    });

    if (overlappingBooking) {
      return res
        .status(400)
        .json({ message: "Transport is already booked for selected dates." });
    }

    // Proceed with adding to booking history if there is no overlap
    const booking = new TransportBookingHistory({
      userId,
      transportId,
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

const getBookingHistoryByUserId_1 = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const bookingHistory = await BookingHistory.find({
      userId: userId,
    }).populate("transportId");

    res.status(200).json(bookingHistory);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteBookingHistory_1 = async (req, res) => {
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

module.exports = {
  addBookingToHistory_1,
  getBookingHistoryByUserId_1,
  deleteBookingHistory_1,
};

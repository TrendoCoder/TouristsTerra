// models/shop/bookingHistory.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingHistorySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is your user model
      required: true,
    },
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Details", // Assuming 'Guide' is your guide model
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingHistory = mongoose.model("BookingHistory", bookingHistorySchema);

module.exports = BookingHistory;

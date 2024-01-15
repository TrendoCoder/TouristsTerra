// models/shop/bookingHistory.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingHistory_1Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is your user model
      required: true,
    },
    transportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transportdetail", // Assuming 'Guide' is your guide model
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

const BookingHistory_1 = mongoose.model("BookingHistory_1", bookingHistory_1Schema);

module.exports = BookingHistory_1;

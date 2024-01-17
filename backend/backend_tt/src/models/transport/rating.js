const mongoose = require("mongoose");

const rating_2Schema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Set maximum rating value as per your requirements
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transportdetail",
    required: true,
  },
});

const Rating_2 = mongoose.model("Rating_2", rating_2Schema);

module.exports = Rating_2;

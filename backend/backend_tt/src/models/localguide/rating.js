const mongoose = require("mongoose");

const rating_1Schema = new mongoose.Schema({
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
  guideID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Details",
    required: true,
  },
});

const Rating_1 = mongoose.model("Rating_1", rating_1Schema);

module.exports = Rating_1;

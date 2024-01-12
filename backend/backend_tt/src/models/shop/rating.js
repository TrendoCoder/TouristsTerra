const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
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
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;

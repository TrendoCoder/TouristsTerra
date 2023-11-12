const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can not be less then 0."],
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Rating must be between 0 and 5."],
      max: [5, "Rating must be between 0 and 5."],
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const Details = mongoose.model("Details", detailsSchema);

module.exports = Details;

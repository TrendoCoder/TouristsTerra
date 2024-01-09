const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transportDetailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    vehicleNo: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    ratings: {
      type: Number,
      default: 5,
      min: [0, "Rating must be between 0 and 5."],
      max: [5, "Rating must be between 0 and 5."],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Transportcategory",
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transportdetail = mongoose.model(
  "Transportdetail",
  transportDetailSchema
);

module.exports = Transportdetail;

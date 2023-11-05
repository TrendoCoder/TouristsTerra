const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      //required: true,
      trim: true,
    },
    slug: {
      type: String,
      //required: true,
      // unique: true,
      //lowercase: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      //required: true,
    },
    color: {
      type: String,
      enum: ["Black", "Green", "Red"],
    },
    ratings: [
      {
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    brand: {
      type: String,
      enum: ["PUMA", "Adidas", "Prada"],
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);

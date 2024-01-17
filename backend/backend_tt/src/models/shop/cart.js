const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a Product Item sub-schema for use within the Cart schema
const productItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Assuming 'Product' is your product model
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is your user model
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { _id: false }
); // _id set to false if you don't want separate _id for subdocuments

// Main Cart schema
const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is your user model
      required: true,
    },
    products: [productItemSchema], // An array of product items
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "ordered", "canceled"],
      default: "active",
    },
  },
  { timestamps: true }
); // Includes createdAt and updatedAt fields

// Create the Cart model with the defined schema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

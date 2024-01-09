const mongoose = require("mongoose");

const transportCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Transportcategory = mongoose.model(
  "Transportcategory",
  transportCategorySchema
);

module.exports = Transportcategory;

var mongoose = require("mongoose");
const { Schema } = mongoose;
const ServiceProviderSchema = new mongoose.Schema(
  {
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    contact: String,
    cnic: String,
    city: String,
    experience: String,
    language: String,
    requestFor: String,
    idCardFrontImg: String,
    idCardBackImg: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);
var ServiceProvider = mongoose.model("ServiceProvider", ServiceProviderSchema);
module.exports.ServiceProvider = ServiceProvider;

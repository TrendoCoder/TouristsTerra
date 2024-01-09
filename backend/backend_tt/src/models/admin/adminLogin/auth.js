var mongoose = require("mongoose");
const { Schema } = mongoose;
const AdminSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

var Admin = mongoose.model("Admin", AdminSchema);

module.exports.Admin = Admin;

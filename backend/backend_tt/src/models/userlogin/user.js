var mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    email: String,
    userName: String,
    contact: String,
    password: String,
    userProfilePicture: { type: String, default: "" },
    userCoverPicture: { type: String, default: "" },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerifiedUser: {
      type: Boolean,
      default: false,
    },
    isBlogAdmin: {
      type: String,
      default: "Pending",
    },
    isAccomodationAdmin: {
      type: String,
      default: "Pending",
    },
    isTrasportAdmin: {
      type: Boolean,
      default: false,
    },
    isShopAdmin: {
      type: Boolean,
      default: false,
    },
    isLocalGuideAdmin: {
      type: Boolean,
      default: false,
    },
    about: { type: String, default: "" },
    gender: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);

module.exports.User = User;

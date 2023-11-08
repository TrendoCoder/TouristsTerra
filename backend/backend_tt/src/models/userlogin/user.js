var mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    email: String,
    userName: String,
    contact: Number,
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
      type: Boolean,
      default: false,
    },
    isAccomodationAdmin: {
      type: Boolean,
      default: false,
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
    about: String,
    gender: String,
    city: String,
    country: String,
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);

module.exports.User = User;

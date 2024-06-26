// var mongoose = require("mongoose");
// var bcrypt = require("bcryptjs");
// const Joi = require("joi");
// var bcrypt = require("bcryptjs");
// const _ = require("lodash");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");

// var userSchema = mongoose.Schema(
//   {
//     email: String,
//     userName: String,
//     contact: Number,
//     password: String,
//     confirmPassword: String,
//     userProfilePicture: { type: String, default: "" },
//     userCoverPicture: { type: String, default: "" },
//     followers: {
//       type: Array,
//       default: [],
//     },
//     following: {
//       type: Array,
//       default: [],
//     },
//     isBlogAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     isAccomodationAdmin: {
//         type: Boolean,
//         default: false,
//       },
//       isTrasportAdmin: {
//         type: Boolean,
//         default: false,
//       },
//       isShopAdmin: {
//         type: Boolean,
//         default: false,
//       },
//       isLocalGuideAdmin: {
//         type: Boolean,
//         default: false,
//       },
//     about: String,
//     gender:String,
//     city: String,
//     country: String,
//   },

//   { timestamps: true }
// );

// userSchema.methods.generateHashedPassword = async function () {
//   let salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// };
// var User = mongoose.model("User", userSchema);

// function validateUser(data) {
//   const schema = Joi.object({
//     email: Joi.string().min(10).max(40).required(),
//     userName: Joi.string().min(3).max(30).required(),
//     contact: Joi.number().min(1000000000).max(99999999999).required(),
//     password: Joi.string().min(4).max(30).required(),
//     confirmPassword: Joi.string().min(4).max(30).required(),
//   });
//   return schema.validate(data, { abortEarly: false });
// }

// function validateUserLogin(data) {
//   const schema = Joi.object({
//     email: Joi.string().min(3).max(40).required(),
//     password: Joi.string().min(3).max(40).required(),
//   });
//   return schema.validate(data, {
//     abortEarly: false,
//   });
// }

// function validateUserProfile(data) {
//   const schema = Joi.object({
//     about: Joi.string().min(0).max(150).required(),
//   });
//   return schema.validate(data, {
//     abortEarly: false,
//   });
// }

// module.exports.User = User;
// module.exports.validateUser = validateUser;
// module.exports.validateUserLogin = validateUserLogin;
// module.exports.validateUserProfile = validateUserProfile;

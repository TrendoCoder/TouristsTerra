var mongoose = require("mongoose");
const Joi = require("joi");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

var userSchema = mongoose.Schema({
  email: String,
  userName: String,
  contact: Number,
  password: String,
  confirmPassword: String,
});

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};
var User = mongoose.model("User", userSchema);

function validateUser(data) {
  const schema = Joi.object({
    email: Joi.string().min(10).max(40).required(),
    userName: Joi.string().min(3).max(30).required(),
    contact: Joi.number().min(1000000000).max(99999999999).required(),
    password: Joi.string().min(4).max(30).required(),
    confirmPassword: Joi.string().min(4).max(30).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.validateUser = validateUser;

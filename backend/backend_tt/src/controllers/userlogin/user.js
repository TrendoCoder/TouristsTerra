const express = require("express");
const { User } = require("../../models/userlogin/user");
const bcrypt = require("bcryptjs");
const updateUser = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        next(err);
      }
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};
module.exports.updateUser = updateUser;

const deleteUser = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  }
};
module.exports.deleteUser = deleteUser;

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
module.exports.getUser = getUser;

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    const { password, updatedAt, ...other } = users._doc;
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
module.exports.getAllUser = getAllUser;

const followAUser = async (req, res, nexy) => {
  try {
  } catch (err) {
    next(err);
  }
};

const express = require("express");
let router = express.Router();
let { User, validateUser } = require("../../models/user");

const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { valid } = require("joi");
const multer = require("multer");
let Storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, cb) => {
    cb(null, Data.now(file.originalname));
    //  cb(null, file.originalname)
  },
});

let upload = multer({
  storage: Storage,
});

router.post("/signup", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user)return res.status(400).send("Already exist User");

  user = new User();
  user.email = req.body.email;
  user.userName = req.body.userName;
  user.contact = req.body.contact;
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  await user.generateHashedPassword();
  await user.save();

  // let token = jwt.sign({
  //   _id: user._id,
  //   email: email,
  //   userName: userName,
  // });

  let dataToReturn = {
    email: user.email,
    userName: user.userName,
    contact: user.contact,
    password: user.password,
    confirmPassword: user.confirmPassword,
  };
  return res.send(dataToReturn);
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("user not exist");

  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return res.status(401).send("Invalid Password");
  }
  let token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});

router.post(
  "/eidtprofile",
  upload.single("userProfileImg"),
  async (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.about = req.body.about;
    user.userProfileImg = req.file.filename;
    await user.save();

    let dataToReturn = {
      about: user.about,
      userProfileImg: user.userProfileImg,
    };
    return res.send(dataToReturn);
  }
);

module.exports = router;

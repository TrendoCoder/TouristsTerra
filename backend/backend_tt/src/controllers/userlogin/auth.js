const { User } = require("../../models/userlogin/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../../utils/error");

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ userName: req.body.userName });

    if (existingUser) {
      return res.status(409).send("Username already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      contact: req.body.contact,
      password: hash,
      isAdmin: true,
    });
    await newUser.save();
    res.status(200).send("User has been created ");
  } catch (err) {
    next(err);
  }
};

module.exports.register = register;

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or Email!"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "jwtPrivateKey"
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
module.exports.login = login;

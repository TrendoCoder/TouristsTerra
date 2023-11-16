const express = require("express");
const {
  register,
  login,
  verifyOtp,
  generateOtp,
  resetPassword,
  createResetSession,
} = require("../../../controllers/userlogin/auth");
const {registerMail} = require("../../../controllers/userlogin/maller")
const { localVeriables, verifyUser } = require("../../../utils/verifytoken");

let router = express.Router();

router.post("/register", register);
router.post("/loginUser", login);
router.get("/otpGenerator",verifyUser, localVeriables, generateOtp);
router.get("/verifyOtp", verifyOtp);
router.get("/createResetSession", createResetSession);
router.put("/resetPassword",resetPassword);
router.post("/registerMail", registerMail);
module.exports = router;

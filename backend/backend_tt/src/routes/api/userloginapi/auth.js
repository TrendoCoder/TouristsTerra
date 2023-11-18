const express = require("express");
const {
  register,
  login,
  generateOtp,
  resetPassword,
  createResetSession,
  verifyOtp,
  alreadyRegister,
} = require("../../../controllers/userlogin/auth");
const {registerMail} = require("../../../controllers/userlogin/maller")
const { localVeriables, verifyUser } = require("../../../utils/verifytoken");

let router = express.Router();
router.get("/alreadyRegister", alreadyRegister);
router.post("/register", register);
router.post("/loginUser", login);
router.get("/otpGenerator", localVeriables, generateOtp);
router.get("/verifyOtp", verifyOtp);
router.get("/createResetSession", createResetSession);
router.put("/resetPassword",resetPassword);
router.post("/registerMail", registerMail);
module.exports = router;

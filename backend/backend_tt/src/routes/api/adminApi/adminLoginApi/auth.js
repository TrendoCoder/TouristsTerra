const express = require("express");
const {
  login,
  generateOtp,
  verifyOtp,
  createResetSession,
  resetPassword,
  register,
  existAdmin,
  getAdminByEmail,
} = require("../../../../controllers/adminController/adminlogin/auth");
const { registerMail } = require("../../../../controllers/userlogin/maller");
const { localVeriables } = require("../../../../utils/verifytoken");

let router = express.Router();
router.get("/existAdmin", existAdmin);
router.post("/registerAdmin", register);
router.post("/loginAdmin", login);
router.get("/:email", getAdminByEmail);
router.get("/otpGenerator", localVeriables, generateOtp);
router.get("/verifyOtp", verifyOtp);
router.get("/createResetSession", createResetSession);
router.put("/resetPassword", resetPassword);
router.post("/registerMail", registerMail);


module.exports = router;

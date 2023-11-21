const express = require("express");
const router = express.Router();
const checkoutController = require("../../../controllers/stripe/checkoutController");

router.post(
  "/create-checkout-session",
  checkoutController.createCheckoutSession
);

module.exports = router;

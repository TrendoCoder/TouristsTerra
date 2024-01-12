const express = require("express");
const router = express.Router();
const checkoutController = require("../../../controllers/localguideStripe/checkoutControllerLG");

router.post(
  "/create-checkout-session1",
  checkoutController.createCheckout_1Session
);

module.exports = router;

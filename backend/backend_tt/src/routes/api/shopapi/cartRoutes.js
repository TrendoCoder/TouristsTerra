const express = require("express");
const router = express.Router();
const { auth } = require("../../../middleware/auth");
const {
  addToCart,
  getCartByUserId,
  updateCart,
  deleteCart,
} = require("../../../controllers/shop/cartController");

router.post("/add-to-cart", addToCart);
router.get("/get-cart/:userId", getCartByUserId);
router.put("/update-cart/:cartId", updateCart);
router.delete("/delete-cart/:cartId", deleteCart);

module.exports = router;

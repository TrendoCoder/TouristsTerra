const express = require("express");
const { createProduct } = require("../../../controllers/shop/productctrl");
const router = express.Router();

router.post("/", createProduct);

module.exports = router;

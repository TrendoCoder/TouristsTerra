const Product = require("../../models/shopmodel/productmodel");

const createProduct = async (req, res) => {
  res.json({
    message: "hey it product post route",
  });
};
module.exports = { createProduct };

// controllers/cartController.js
const { default: mongoose } = require("mongoose");
const Cart = require("../../models/shop/cart");
const Product = require("../../models/shop/products");
const { User } = require("../../models/userlogin/user");

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Convert userId to a mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Query the cart using the 'user' field
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    // This could be a CastError if the userId is not a valid ObjectId, handle it accordingly
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const { productId, quantity } = req.body;

    if (!cartId || !productId || quantity === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    if (quantity == 0) {
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
    } else {
      // Update the quantity of the product
      cart.products[productIndex].quantity = quantity;
    }

    cart.totalPrice = cart.products.reduce((total, item) => {
      if (isNaN(item.price) || isNaN(item.quantity)) {
        throw new Error("Invalid product price or quantity");
      }
      return total + item.price * item.quantity;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error.message);
    if (error.message === "Invalid product price or quantity") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId, sellerId, quantity, image, name, price } =
      req.body;
    let user = await User.findOne({ _id: userId });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: user,
        products: [{ productId, sellerId, quantity, image, name, price }], // Ensure this matches your schema
      });
      cart.totalPrice = price * quantity;
      await cart.save();
    } else {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingProductIndex !== -1) {
        // Product exists, update the quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Product does not exist, add as a new product
        cart.products.push({
          productId,
          sellerId,
          quantity,
          image,
          name,
          price,
        });
      }
      // Calculate the totalPrice
      cart.totalPrice = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addToCart, getCartByUserId, updateCart, deleteCart };

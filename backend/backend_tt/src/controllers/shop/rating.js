const Rating = require("../../models/shop/rating");
const mongoose = require("mongoose");
// Controller to add a new rating
exports.addRating = async (req, res) => {
  try {
    console.log("ASaasaas");
    const { quantity, userId } = req.body;
    const productID = req.params.productID;

    // Create a new rating instance
    const newRating = new Rating({
      quantity,
      userId,
      productID,
    });

    // Save the rating to the database
    const savedRating = await newRating.save();

    res.status(201).json(savedRating);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
// Assuming you've already defined Rating model as per the provided schema

// Function to get average rating for a specific product
const getAverageRatingByProductId = async (productId) => {
  try {
    const avgRating = await Rating.aggregate([
      { $match: { productID: new mongoose.Types.ObjectId(productId) } }, // Correctly converting string to ObjectId
      {
        $group: {
          _id: "$productID", // Group by productID
          avgRating: { $avg: "$quantity" }, // Calculate average of quantity field
        },
      },
    ]);
    return avgRating;
  } catch (error) {
    console.error("Error in getting average rating: ", error);
    throw error;
  }
};

// Controller to handle request for a product's average rating
exports.getAverageRatingByProductId = async (req, res) => {
  try {
    const productId = req.params.productId; // Get product ID from request parameters
    const avgRating = await getAverageRatingByProductId(productId); // Use the function
    res.json(avgRating);
  } catch (error) {
    res.status(500).send("Error in fetching average rating");
  }
};

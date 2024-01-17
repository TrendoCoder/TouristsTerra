const TransportRating = require("../../models/transport/rating");
const mongoose = require("mongoose");

// Controller to add a new transport rating
exports.addTransportRating = async (req, res) => {
  try {
    const { quantity, userId } = req.body;
    const transportID = req.params.transportID;

    // Create a new transport rating instance
    const newTransportRating = new TransportRating({
      quantity,
      userId,
      transportID,
    });

    // Save the transport rating to the database
    const savedTransportRating = await newTransportRating.save();

    res.status(201).json(savedTransportRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get average rating for a specific transport
const getAverageTransportRatingByTransportId = async (transportId) => {
  try {
    const avgRating = await TransportRating.aggregate([
      { $match: { transportID: new mongoose.Types.ObjectId(transportId) } },
      {
        $group: {
          _id: "$transportID",
          avgRating: { $avg: "$quantity" },
        },
      },
    ]);
    return avgRating;
  } catch (error) {
    console.error("Error in getting average transport rating: ", error);
    throw error;
  }
};

// Controller to handle request for a transport's average rating
exports.getAverageTransportRatingByTransportId = async (req, res) => {
  try {
    const transportId = req.params.transportId;
    const avgRating = await getAverageTransportRatingByTransportId(transportId);
    res.json(avgRating);
  } catch (error) {
    res.status(500).send("Error in fetching average transport rating");
  }
};

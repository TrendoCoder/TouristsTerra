const LocalGuideRating = require("../../models/localguide/rating");
const mongoose = require("mongoose");

// Controller to add a new local guide rating
exports.addLocalGuideRating = async (req, res) => {
  try {
    const { quantity, userId } = req.body;
    const guideID = req.params.guideID;

    // Create a new local guide rating instance
    const newLocalGuideRating = new LocalGuideRating({
      quantity,
      userId,
      guideID,
    });

    // Save the local guide rating to the database
    const savedLocalGuideRating = await newLocalGuideRating.save();

    res.status(201).json(savedLocalGuideRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get average rating for a specific local guide
const getAverageLocalGuideRatingByGuideId = async (guideId) => {
  try {
    const avgRating = await LocalGuideRating.aggregate([
      { $match: { guideID: new mongoose.Types.ObjectId(guideId) } },
      {
        $group: {
          _id: "$guideID",
          avgRating: { $avg: "$quantity" },
        },
      },
    ]);
    return avgRating;
  } catch (error) {
    console.error("Error in getting average local guide rating: ", error);
    throw error;
  }
};

// Controller to handle request for a local guide's average rating
exports.getAverageLocalGuideRatingByGuideId = async (req, res) => {
  try {
    const guideId = req.params.guideId;
    const avgRating = await getAverageLocalGuideRatingByGuideId(guideId);
    res.json(avgRating);
  } catch (error) {
    res.status(500).send("Error in fetching average local guide rating");
  }
};

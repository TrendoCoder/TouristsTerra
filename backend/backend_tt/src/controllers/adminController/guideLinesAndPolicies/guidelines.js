const { Guidelines } = require("../../../models/admin/guidelinesandpolicies/guidelinesAndPolicies");

// Create Guidelines
const createGuidelines = async (req, res, next) => {
  const newGuidelines = new Guidelines(req.body);
  try {
    const savedGuideline = await newGuidelines.save();
    res.status(200).json(savedGuideline);
  } catch (err) {
    next(err);
  }
};
module.exports.createGuidelines = createGuidelines;

// Get Guidelines
const getGuidelines = async (req, res, next) => {
  try {
    const guidelines = await Guidelines.find();
    res.status(200).json(guidelines);
  } catch (err) {
    next(err);
  }
};
module.exports.getGuidelines = getGuidelines;

// Update Guidelines
const updateGuidelines = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedGuideline = await Guidelines.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedGuideline);
  } catch (err) {
    next(err);
  }
};
module.exports.updateGuidelines = updateGuidelines;

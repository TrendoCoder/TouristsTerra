// Import the Transportdetail model
const Transportdetail = require("../../models/transport/transportDetail");

// Similar controller structure adapted for Transportdetail
exports.createTransportDetail = async (req, res) => {
  try {
    const transportDetail = new Transportdetail({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      ratings: req.body.ratings,
      category: req.body.category,
      seller: req.body.seller,
      inStock: req.body.inStock,
      vehicleNo: req.body.vehicleNo,
      image: req.body.image,
    });
    await transportDetail.save();
    res.status(201).json(transportDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransportDetail = async (req, res) => {
  try {
    const transportDetail = await Transportdetail.findById(req.params.id)
      .populate("category")
      .populate("seller");
    if (!transportDetail)
      return res.status(404).json({ message: "TransportDetail not found" });
    res.json(transportDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTransportDetail = async (req, res) => {
  try {
    const transportDetail = await Transportdetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .populate("category")
      .populate("seller");
    if (!transportDetail)
      return res.status(404).json({ message: "TransportDetail not found" });
    res.json(transportDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTransportDetail = async (req, res) => {
  try {
    const transportDetail = await Transportdetail.findByIdAndDelete(
      req.params.id
    );
    if (!transportDetail)
      return res.status(404).json({ message: "TransportDetail not found" });
    res.status(200).json({ message: "TransportDetail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchTransportDetails = async (req, res) => {
  try {
    // Extract query string
    const { q } = req.query;
    // Build a 'find' query with a case-insensitive regex search
    const searchQuery = q ? { name: new RegExp(q, "i") } : {};

    // Execute the query and return the results
    const transportDetails = await Transportdetail.find(searchQuery)
      .populate("category")
      .populate("seller");
    res.json(transportDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransportDetails = async (req, res) => {
  try {
    let queryObject = {};

    // Filter by exact price
    if (req.query.price) {
      queryObject.price = parseFloat(req.query.price);
    }

    // Filter by exact quantity
    if (req.query.quantity) {
      queryObject.quantity = parseInt(req.query.quantity);
    }

    // Filter by stock availability
    if (req.query.inStock) {
      queryObject.inStock = req.query.inStock === "true";
    }

    // Filter by exact rating
    if (req.query.rating) {
      queryObject.ratings = parseFloat(req.query.rating);
    }

    // You can keep the sorting logic if it is required
    let sort = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(",");
      sortFields.forEach((field) => {
        const [key, order] = field.startsWith("-")
          ? [field.substring(1), -1]
          : [field, 1];
        sort[key] = order;
      });
    }

    const transportDetails = await Transportdetail.find(queryObject)
      .populate("category")
      .sort(sort);
    res.status(200).json(transportDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

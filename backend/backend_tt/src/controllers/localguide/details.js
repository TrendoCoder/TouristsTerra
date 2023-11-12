const Details = require("../../models/localguide/details");

exports.createDetails = async (req, res) => {
  try {
    const details = new Details({
      name: req.body.name,
      price: req.body.price,
      about: req.body.about,
      quantity: req.body.quantity,
      ratings: req.body.ratings,
      city: req.body.city,
      seller: req.body.seller,
      status: req.body.status,
      languages: req.body.languages, // Corrected field assignment
    });

    // Validate the details before saving
    const validationError = details.validateSync();
    if (validationError) {
      throw validationError;
    }

    await details.save();
    res.status(201).json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDetails = async (req, res) => {
  try {
    const details = await Details.findById(req.params.id)
      .populate("city")
      .populate("seller");
    if (!details) return res.status(404).json({ message: "Guide not found" });
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const details = await Details.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("city")
      .populate("seller");
    if (!details) return res.status(404).json({ message: "Guide not found" });
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDetails = async (req, res) => {
  try {
    const details = await Details.findByIdAndDelete(req.params.id);
    if (!details) return res.status(404).json({ message: "Details not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.searchDetails = async (req, res) => {
//   try {
//     // Extract query string
//     const { q } = req.query;
//     // Build a 'find' query with a case-insensitive regex search
//     const searchQuery = q ? { name: new RegExp(q, "i") } : {};

//     // Execute the query and return the results
//     const details = await Details.find(searchQuery)
//       .populate("city")
//       .populate("seller");
//     res.json(details);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// exports.searchDetails = async (req, res) => {
//   try {
//     // Extract query string
//     const { q } = req.query;
//     // Build a 'find' query with a case-insensitive regex search
//     const searchQuery = q ? { name: new RegExp(q, "i") } : {};

//     // Execute the query and return the results
//     const details = await Details.find(searchQuery)
//       .populate("city")
//       .populate("seller");

//     res.json(details);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getDetailss = async (req, res) => {
  try {
    let queryObject = {};

    // Filter by exact price
    if (req.query.price) {
      queryObject.price = parseFloat(req.query.price);
    }

    // Filter by exact quantity
    // if (req.query.quantity) {
    //   queryObject.quantity = parseInt(req.query.quantity);
    // }

    // Filter by stock availability
    if (req.query.status) {
      queryObject.status = req.query.status === "true";
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

    const details = await Details.find(queryObject).populate("city").sort(sort);
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

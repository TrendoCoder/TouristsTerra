// routes/serviceproviders/serviceProviders.js

const express = require("express");
const {
  createServiceProvider,
  getServiceProvider,
  getAllServiceProvider,
  updateServiceProvider,
  deleteServiceProvider,
} = require("../../../controllers/serviceproviders/serviceProviders");
const router = express.Router();

// Post a request for serviceProvider
router.post("/", createServiceProvider);

// Get all serviceProviders
router.get("/all", getAllServiceProvider);

// Get a specific serviceProvider by ID
router.get("/:id", getServiceProvider);

// Update a serviceProvider by ID
router.put("/:id", updateServiceProvider);

// Delete a serviceProvider by ID
router.delete("/:id", deleteServiceProvider);

module.exports = router;

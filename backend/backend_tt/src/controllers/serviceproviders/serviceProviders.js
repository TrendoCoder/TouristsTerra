const express = require("express");
const { ServiceProvider } = require("../../models/serviceproviders/serviceproviders");

// Create a new serviceProvider
const createServiceProvider = async (req, res, next) => {
  const newServiceProvider = new ServiceProvider(req.body);
  try {
    const savedServiceProvider = await newServiceProvider.save();
    res.status(200).json(savedServiceProvider);
  } catch (err) {
    next(err);
  }
};
module.exports.createServiceProvider = createServiceProvider;

// Get a specific serviceProvider by ID
const getServiceProvider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const serviceProvider = await ServiceProvider.findById(id);
    if (!serviceProvider) {
      return res.status(404).json({ message: "ServiceProvider not found" });
    }
    res.status(200).json(serviceProvider);
  } catch (err) {
    next(err);
  }
};
module.exports.getServiceProvider = getServiceProvider;

// Get all serviceProviders
const getAllServiceProvider = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const serviceProviders = await ServiceProvider.find(query);
    res.status(200).json(serviceProviders)
  } catch (err) {
    next(err);
  }
};
module.exports.getAllServiceProvider = getAllServiceProvider;

// Update a serviceProvider by ID
const updateServiceProvider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedServiceProvider);
  } catch (err) {
    next(err);
  }
};
module.exports.updateServiceProvider = updateServiceProvider;

// Delete a serviceProvider by ID
const deleteServiceProvider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedServiceProvider = await ServiceProvider.findByIdAndDelete(id);
    if (!deletedServiceProvider) {
      return res.status(404).json({ message: "ServiceProvider not found" });
    }
    res.status(200).json(deletedServiceProvider);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteServiceProvider = deleteServiceProvider;

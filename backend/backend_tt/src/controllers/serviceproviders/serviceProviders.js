const express = require("express");
const { ServiceProvider } = require("../../models/serviceproviders/serviceproviders");

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

const updateServiceProvider = async (req, res, next) => {

  };
module.exports.updateServiceProvider = updateServiceProvider;

const getServiceProvider = async (req, res, next) => {p

};
module.exports.getServiceProvider = getServiceProvider;

const getAllServiceProvider = async (req, res, next) => {

};
module.exports.getAllServiceProvider = getAllServiceProvider;

const deleteServiceProvider = async (req, res, next) => {

};
module.exports.deleteServiceProvider = deleteServiceProvider;
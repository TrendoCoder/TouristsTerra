const express = require("express");
const { Report } = require("../../models/reports/reports");

const createReport = async (req, res, next) => {
  const newReport = new Report(req.body);
  try {
    const savedReport = await newReport.save();
    res.status(200).json(savedReport);
  } catch (err) {
    next(err);
  }
};
module.exports.createReport = createReport;

const getReport = async (req, res, next) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};
module.exports.getReport = getReport;

const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};
module.exports.getAllReports = getAllReports;

const deleteReport = async (req, res, next) => {
  const reportId = req.params.id;

  try {
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteReport = deleteReport;

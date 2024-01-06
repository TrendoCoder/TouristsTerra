const express = require("express");
const {
  createReport,
  getReport,
  getAllReports,
  deleteReport,
} = require("../../../controllers/reports/report");
const router = express.Router();
router.post("/", createReport);
router.get("/:id", getReport);
router.get("/all", getAllReports);
router.get("/:id", deleteReport);
module.exports = router;

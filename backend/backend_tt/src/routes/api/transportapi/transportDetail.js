// transportDetailRoutes.js

const express = require("express");
const router = express.Router();
const transportDetailController = require("../../../controllers/transport/transportDetail");

router.post("/", transportDetailController.createTransportDetail);
router.get("/", transportDetailController.getTransportDetails);
router.get("/:id", transportDetailController.getTransportDetail);
router.put("/:id", transportDetailController.updateTransportDetail);
router.delete("/:id", transportDetailController.deleteTransportDetail);
// Search route
router.get("/search", transportDetailController.searchTransportDetails);

module.exports = router;

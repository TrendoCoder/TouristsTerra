const express = require("express");
const router = express.Router();
const guideDetailsController = require("../../../controllers/localguide/details");

router.post("/createDetails", guideDetailsController.createDetails);
router.get("/", guideDetailsController.getDetailss);
router.get("/:id", guideDetailsController.getDetails);
router.put("/:id", guideDetailsController.updateDetails);
router.delete("/:id", guideDetailsController.deleteDetails);
// Search route
// router.get("/search", guideDetailsController.searchDetails);

module.exports = router;

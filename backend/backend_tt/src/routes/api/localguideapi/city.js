const express = require("express");
const router = express.Router();
const cityController = require("../../../controllers/localguide/city");

router.post("/", cityController.createCity);
router.get("/", cityController.getCities);
router.get("/:id", cityController.getCity);
router.put("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;

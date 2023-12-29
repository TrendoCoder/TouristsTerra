const express = require("express");
const router = express.Router();
const explorecontroller = require("../../../controllers/explore/explorecontroller");


router.get("/places/:cityName",explorecontroller.getAllPlaceData);
router.get("/places/details/:placeId", explorecontroller.getPlaceDetails);

module.exports = router;

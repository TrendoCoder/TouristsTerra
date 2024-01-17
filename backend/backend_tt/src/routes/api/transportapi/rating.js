// transportRoutes.js

const express = require('express');
const router = express.Router();
const transportRatingController = require('../../../controllers/transport/rating');

router.post('/:transportID', transportRatingController.addTransportRating);
router.get('/average-rating/:transportId', transportRatingController.getAverageTransportRatingByTransportId);

module.exports = router;

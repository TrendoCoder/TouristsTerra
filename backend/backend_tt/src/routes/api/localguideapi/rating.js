// localGuideRoutes.js

const express = require('express');
const router = express.Router();
const localGuideRatingController = require('../../../controllers/localguide/rating');

router.post('/:guideID', localGuideRatingController.addLocalGuideRating);
router.get('/average-rating/:guideId', localGuideRatingController.getAverageLocalGuideRatingByGuideId);

module.exports = router;

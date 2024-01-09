// productRoutes.js

const express = require('express');
const router = express.Router();
const ratingController = require('../../../controllers/shop/rating');

router.post('/:productID', ratingController.addRating);
router.get('/average-rating/:productId', ratingController.getAverageRatingByProductId);

module.exports = router;

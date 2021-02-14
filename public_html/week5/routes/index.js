var express = require('express');
var router = express.Router();
var ctrlReviews = require('./review.controller')

/** GET Reviews */
router.get('/reviews', ctrlReviews.reviewsReadAll)
router.get('/reviews/:reviewid', ctrlReviews.reviewsReadOne)

/** Create Reviews */
router.post('/reviews', ctrlReviews.reviewsCreate)

/** Update Reviews */
router.put('/reviews/:reviewid', ctrlReviews.reviewsUpdateOne)

/** Delete Reviews */
router.delete('/reviews/:reviewid', ctrlReviews.reviewsDeleteOne)

module.exports = router;
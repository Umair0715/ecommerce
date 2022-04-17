const router = require('express').Router();
const { protect , isAdmin } = require('./../middlewares/protect');
const reviewController = require('./../controllers/reviewController');

router.route('/all')
   .get(protect , isAdmin , reviewController.getAllReviews);
router.route('/:id')
   .post(protect , reviewController.createReview)
   .delete(protect , reviewController.deleteReview)
   .get(protect , isAdmin , reviewController.getSingleProductReviews)

module.exports = router;
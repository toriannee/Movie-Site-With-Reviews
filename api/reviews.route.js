import express from 'express';
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviewsByMovieId) // to get movie reviews
router.route("/new").post(ReviewsCtrl.apiPostReview) //to create new review
router.route("/:reviewid")
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)


router.route('/').get((req, res) => res.send('hello world'))

export default router;


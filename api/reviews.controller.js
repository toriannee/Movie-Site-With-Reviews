import ReviewsDAO from "../dao/reviewsDAO.js"; // used to access database

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        console.log("POST", req.body);
        try {
            const movieId = req.body.movieId;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
            res.json({ status: 'success' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetReview(req, res, next) {
        console.log("REVIEW ID 1", req.params);
        try {
            let id = req.params.reviewid || {};
            let review = await ReviewsDAO.getReview(id);
            if (!review) {
                res.status(404).json({ error: 'Not found' })
                return
            }
            res.json(review)
        } catch (err) {
            console.log(`api, ${err}`)
            res.status(500).json({ error: err })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.params.id;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);

            var { error } = reviewId
            if (error) {
                res.status(400).json({ error })
            }
            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    'Unable to update review'
                )
            }

            res.json({ status: 'success' });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const id = req.params.reviewid;
            const reviewResponse = await ReviewsDAO.deleteReview(id);

            res.status(500).json({ status: 'success' })


        } catch (err) {

            res.status(500).json({ error: err.message })
        }
    }
    static async apiGetReviewsByMovieId(req, res, next) {
        try {
            let id = req.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if (!reviews) {
                res.status(404).json({ error: 'Not found' })
                return
            }
            res.json(reviews)
        } catch (err) {
            console.log(`api, ${err}`)
            res.status(500).json({ error: err })
        }
    }

}



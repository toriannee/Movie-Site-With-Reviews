import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db('reviews').collection('reviews')
        } catch (err) {
            console.error(`Unable to estabish collection handles in userDAO ${err}`)
        }

    }
    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }
            return await reviews.insertOne(reviewDoc) // insertOne is a mongdb command to insert 
        } catch (err) {
            console.error(`Unable to post review: ${err}`);
            return { error: err }
        }
    }
    static async getReview(reviewId) {
        try {
            return await reviews.findOne({ _id: ObjectId(reviewId) }) // findOne is a mongdb command to find
        } catch (err) {
            console.error(`Unable to get review: ${err}`);
            return { error: err };
        }
    }
    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.UpdateOne(
                { _id: ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            )
            return updateResponse
        } catch (err) {
            console.error(`Unable to post review: ${err}`);
            return { error: err };
        }
    }
    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne(
                { _id: ObjectId(reviewId) },
            )
            return deleteResponse
        } catch (err) {
            console.error(`Unable to post review: ${err}`);
            return { error: err };
        }
    }
    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find(
                {
                    movieId: parseInt(movieId) // parseInt to convert string to integer
                })
            return cursor.toArray()
        } catch (err) {
            console.error(`Unable to get review: ${err}`);
            return { error: err };
        }
    }
}


import express from 'express';
import { securedRoute } from '../middleware/auth.middleware.js';
import { postReview, getMyReviews, updateMyReview, deleteReview, getReviewOfBike, getAllReviews } from '../controllers/reviews.controller.js'

const router = express.Router()

router.post("/post-review", securedRoute, postReview);
router.put("/update-my-review/:id", securedRoute, updateMyReview);
router.get("/get-my-reviews", securedRoute, getMyReviews);
router.get("/get-review-of-bike/:id", getReviewOfBike);
router.get("/get-all-reviews", securedRoute, getAllReviews);
router.delete("/delete-review/:id", securedRoute, deleteReview);


export default router;
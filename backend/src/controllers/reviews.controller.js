import { Review } from "../models/review.model.js";
import { Bike } from "../models/bike.model.js";
import { User } from "../models/user.model.js";

const postReview = async(req, res) => {
    try {
        const userId = req.user.id;
        const {bikeId, rating, comment} = req.body;

        if (!bikeId || !rating || !comment) {
            return res.status(401)
            .json({message: "All fields are required"});
        }

        const bike = await Bike.findById(bikeId);
        if (!bike) {
            return res.status(404)
            .json({message: "Bike not found"});
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404)
            .json({message: "User not found"});
        }

        const review = new Review({
            user: userId,
            bike: bikeId,
            rating,
            comment,
        });

        await review.save();
        res.status(200)
        .json({message: "Review added successfully"});
    } catch (error) {
        console.log(`Error in postReview: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getMyReviews = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401)
            .json({message: "User not found"});
        }

        const reviews = await Review.find({user: userId})
        res.status(200)
        .json({reviews, message: "Retrived reviews successfully"});
    } catch (error) {
        console.log(`Error in getMyReviews: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const updateMyReview = async(req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const {bikeId, rating, comment} = req.body;

        const review = await Review.findOne({_id: id, user: userId});
        if (!review) {
            return res.status(401)
            .json({message: "Review not found"});
        }

        if (bikeId) {
            const bike = await Bike.findById(bikeId);
            if (!bike) {
                return res.status(404)
                .json({message: "Bike not found"});
            }
            review.bike = bikeId;
        }

        if (rating) {
            review.rating = rating;
        }

        if (comment) {
            review.comment = comment;       
        }

        await review.save();
        res.status(200)
        .json({message: "Review updated successfully"});
    } catch (error) {
        console.log(`Error in updateMyReview: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteReview = async(req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const review = await Review.findOne({_id: id, user: userId});
        if (!review) {
            return res.status(401)
            .json({message: "Review not found"});
        }
        await Review.findByIdAndDelete(id);
        res.status(200)
        .json({message: "Review deleted successfully"});
    } catch (error) {
        console.log(`Error in deleteReview: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getReviewOfBike = async(req, res) => {
    try {
        const id = req.params.id;
        const bike = await Bike.findById(id);
        if (!bike) {
            return res.status(401)
            .json({message: "Bike not found"});
        }
        const reviews = await Review.find({bike: id});
        res.status(200)
        .json({reviews, message: "Retrived reviews successfully"});
    } catch (error) {
        console.log(`Error in getReviewOfBike: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getAllReviews = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(401)
            .json({message: "User not found"});
        }
        const reviews = await Review.find().populate('bike').populate('user');
        res.status(200)
        .json({reviews, message: "Retrived reviews successfully"});
    } catch (error) {
        console.log(`Error in getAllReviews: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export {postReview, getMyReviews, updateMyReview, deleteReview, getReviewOfBike, getAllReviews};
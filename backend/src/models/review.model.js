import mongoose from 'mongoose'

const revierSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bike",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        reqyired: true,
    },
    comment: {
        type: String
    }
}, {
    timestamps: true,
});

const Review = mongoose.model("Review", revierSchema);
export {Review};
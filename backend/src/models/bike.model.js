import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    location: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        pincode: {
            type: String,
        }
    }
}, {
    timestamps: true
});

const Bike = mongoose.model("Bike", bikeSchema);
export {Bike};
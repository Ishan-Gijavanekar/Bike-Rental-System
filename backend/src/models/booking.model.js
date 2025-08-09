import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
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
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum : ['booked', 'completed', 'cancelled'],
        default: 'booked'
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model("Booking", bookingSchema);
export {Booking}
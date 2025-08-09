import { Bike } from '../models/bike.model.js';
import { Booking } from "../models/booking.model.js"
import { User } from '../models/user.model.js'

const newBooking = async(req, res) => {
    try {
        const {bikeId, startTime, endTime} = req.body;
        if (!bikeId || !startTime || !endTime) {
            return res.status(401)
            .json({message: "All fields are required"});
        }
        const bike = await Bike.findById(bikeId);
        if (!bike || !bike.available) {
            return res.status(404)
            .json({message: "Bike not available"});
        }

        const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
        const totalPrice = duration * bike.pricePerHour;

        const booking = new Booking({
            user: req.user.id,
            bike: bikeId,
            startDate: startTime,
            endDate: endTime,
            totalPrice,
        })

        await booking.save();

        res.status(200)
        .json({
            booking,
            message: "Booking Done successfully"
        });
    } catch (error) {
        console.log(`Error in newBooking: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getMyBookings = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401)
            .json({message: "User not found"});
        }

        const bookings = await Booking.find({user: userId}).populate('bike').populate('user');
        res.status(200)
        .json({bookings,message: "Retrived bookings successfully"});
    } catch (error) {
        console.log(`Error in getMyBookings: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getBookingById = async(req, res) => {
    try {
        const id = req.params.id;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404)
            .json({message: "Booking not found"});
        }
        res.status(200)
        .json({booking,message: "Booking fetched"});
    } catch (error) {
        console.log(`Error in getBookingById: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getAllBookings = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            res.status(403)
            .json({messsage: "Unauthorized"});
        }
        const bookings = await Booking.find().populate('bike').populate('user');
        res.status(200)
        .json({
            bookings,
            message: "Booking fetched successfull"
        })
    } catch (error) {
        console.log(`Error in getAllBookings: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const updateBooking = async(req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            res.status(403)
            .json({messsage: "Unauthorized"});
        }
        const {bikeId, startTime, endTime, status} = req.body;

        const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
        const totalPrice = duration * bike.pricePerHour;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(401)
            .json({message: "Booking not found"});
        }
        booking.bike = bikeId;
        booking.startDate = startTime;
        booking.endDate = endTime;
        booking.totalPrice = totalPrice;
        booking.status = status;
        await booking.save();


        res.status(200)
        .json({
            booking,
            message: "Booking updated successfully"
        });
    } catch (error) {
        console.log(`Error in getAllBookings: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteBooking = async(req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            res.status(403)
            .json({messsage: "Unauthorized"});
        }
        
        await Booking.findByIdAndDelete(id);
        res.status(200).json({message: "Booking Deleted successfully"});
    } catch (error) {
        console.log(`Error in deleteBooking: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export {
    newBooking,
    getMyBookings,
    getBookingById,
    getAllBookings,
    updateBooking,
    deleteBooking
}
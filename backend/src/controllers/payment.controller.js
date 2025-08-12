import Stripe from 'stripe';
import {Payment} from '../models/payment.model.js';
import {Booking} from '../models/booking.model.js';

const stripe = new Stripe(process.env.SECRET_KEY);

const createPayment = async(req, res) => {
    try {
        const {bookingId} = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(401)
            .json({message: "Booking not found"});
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(booking.totalPrice * 100),
            currency: "inr",
            metadata: {
                bookingId: booking._id.toString()
            }
        });
        
        const payment = new Payment({
            booking: bookingId,
            amount: Math.round(booking.totalPrice * 100),
            paymentStatus: "pending",
            transactionId: paymentIntent.id
        });

        await payment.save();
        res.status(200)
        .json({paymentId: payment._id, clientSecret: paymentIntent.client_secret, message: "Payment created successfully"});
    } catch (error) {
        console.log(`Error in createPayment: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const confirmPayment = async(req, res) => {
    try {
        const {paymentId, status} = req.body;
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(401)
            .json({message: "Payment not found"});
        }

        payment.status = status;
        await payment.save();

        res.status(200)
        .json({message: "Payment confirmed successfully"});
    } catch (error) {
        console.log(`Error in confirmPayment: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export {createPayment, confirmPayment};
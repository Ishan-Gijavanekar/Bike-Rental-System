import express from 'express'
import { securedRoute } from '../middleware/auth.middleware.js';
import { getAllBookings, getMyBookings, getBookingById, newBooking, updateBooking, deleteBooking } from '../controllers/booking.controller.js'


const router = express.Router()

router.get("/get-all-bookings",securedRoute, getAllBookings);
router.get("/get-my-bookings",securedRoute, getMyBookings);
router.get("/get-booking-by-id/:id",securedRoute, getBookingById);
router.post("/new-booking",securedRoute, newBooking);
router.put("/update-booking/:id",securedRoute, updateBooking);
router.delete("/delete-booking/:id",securedRoute, deleteBooking);


export default router
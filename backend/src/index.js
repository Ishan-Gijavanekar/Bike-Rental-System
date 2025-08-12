import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDb } from './database/database.js';

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser());


import userRoutes from './routes/user.routes.js';
import bikeRoutes from './routes/bike.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import reviewRoutes from './routes/reviews.routes.js';
import paymentRoutes from './routes/payment.route.js';


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bikes/", bikeRoutes);
app.use("/api/v1/bookings/", bookingRoutes);
app.use("/api/v1/reviews/", reviewRoutes);
app.use("/api/v1/payment/", paymentRoutes);


app.listen(port, () => {
    connectDb();
    console.log(`Server running on port : ${port}`);
})
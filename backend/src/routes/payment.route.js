import express from 'express'
import { securedRoute } from '../middleware/auth.middleware.js';
import {  createPayment, confirmPayment } from '../controllers/payment.controller.js'


const router = express.Router()



router.post("/create-payment", securedRoute, createPayment);
router.post("/confirm-payment", securedRoute, confirmPayment);

export default router
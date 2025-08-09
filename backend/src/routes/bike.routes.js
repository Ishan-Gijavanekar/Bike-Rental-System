import express from 'express'
import { securedRoute } from '../middleware/auth.middleware.js';
import { addBike, deleteBike, getAllBikes, getBikeById, updateBike } from '../controllers/bike.controller.js';
import upload from '../utils/multer.js';

const router = express.Router()

router.get("/get-all-bikes", getAllBikes);
router.get("/get-bike-by-id/:id", getBikeById);
router.post("/add-bike", securedRoute, upload.single("image") ,addBike);
router.put("/update-bike/:id", securedRoute,upload.single("image") ,updateBike);
router.delete("/delete-bike/:id", securedRoute, deleteBike);


export default router;
import { Bike } from "../models/bike.model.js";
import { cloudinary } from "../utils/cloudinary.js";


const getAllBikes = async(req, res) => {
    try {
        const {brand, city, available} = req.query;
        const query = {};
        if (brand) query.brand = brand;
        if (city) query['location.city'] = city;
        if (available != undefined) query.available = available == 'true';
        const bikes = await Bike.find(query);
        if (bikes.length === 0) {
            return res.status(401)
            .json({message: "No bikes found"});
        }

        res.status(200)
        .json({bikes, message:"Fetched all bikes"});
    } catch (error) {
        console.log(`Error in getAllBikes: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getBikeById = async(req, res) => {
    try {
        const id = req.params.id;
        const bike = await Bike.findById(id);
        if (!bike) {
            return res.status(401)
            .json({message: "No bike found"});
        }

        res.status(200)
        .json({
            bike,
            message: "Bike fetched successfully"
        })
    } catch (error) {
        console.log(`Error in getBikeById: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const addBike = async(req, res) => {
    try {
        const {name, brand, pricePerHour, address, city, pincode} = req.body;
        if (!name || !brand || !pricePerHour || !address || !city || !pincode) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const bike = new Bike({
            name,
            brand,
            pricePerHour,
            imageUrl,
            location: {address, city, pincode},
            user: req.user.id
        });

        await bike.save();

        res.status(200)
        .json({
            bike,
            message: "Bike added successfully"
        })
    } catch (error) {
        console.log(`Error in addBike: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const updateBike = async(req, res) => {
    try {
        const {name, brand, pricePerHour, address, city, pincode} = req.body;
        const id = req.params.id;
         if (!name || !brand || !pricePerHour || !address || !city || !pincode) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        const bike = await Bike.findById(id);
        if (!bike) {
            return res.status(401)
            .json({message: "Bike not found"})
        }
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const updatedBike = await Bike.findByIdAndUpdate(
            id,
            {
                name,
                brand,
                pricePerHour,
                imageUrl,
                location: {address, city, pincode}
            }
        )

        if (!updatedBike) {
            return res.status(401)
            .json({message: "Something went wronge"})
        }

        res.status(200)
        .json({
            updatedBike,
            message: "Bike updated successfully"
        })
        
    } catch (error) {
        console.log(`Error in updateBike: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteBike = async(req, res) => {
    try {
        const id = req.params.id;
        const bike = await Bike.findById(id);
        if (!bike) {
            return res.status(401)
            .json({message: "Bike not found"});
        }
        await Bike.findByIdAndDelete(id);
        res.status(200)
        .json({message: "Bike deleted successfully"});
    } catch (error) {
        console.log(`Error in deleteBike: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export {
    getAllBikes,
    getBikeById,
    addBike,
    updateBike,
    deleteBike
}

import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(401)
            .json({Message: "All fields are required"});
        }
        const userExsist = await User.findOne({email});
        if (userExsist) {
            return res.status(401)
            .json({Message: "User already exsists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashPassword,
        });
        await user.save()
        return res.status(200)
        .json({
            user,
            message: "User registered successfully"
        })
    } catch (error) {
        console.log(`Error in register: ${error}`);
        res.status(500).json({Message: "Internal server error"});
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

        const user = await User.findOne({email});
        if (!user) {
             return res.status(401)
            .json({message: "Invalid Credentials"})
        }
        const passwoerdMatch = await bcrypt.compare(password, user.password);
        if (!passwoerdMatch) {
             return res.status(401)
            .json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SECRET_EXPIRY});

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.envNODE_ENV !== 'development',
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200)
        .json({
            user,
            token,
            message: "Login Successfull",
        })

    } catch (error) {
        console.log(`Error in login: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const logout = async(req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200)
        .json({message: "Logged out successfull"});
    } catch (error) {
        console.log(`Error in logout: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const profile = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401)
            .json({message: "User not found"});
        }

        res.status(200)
        .json({
            user,
            message: "User fetched successfully"
        })
    } catch (error) {
        console.log(`Error in profie: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const updateUser = async(req, res) => {
    try {
        const userId = req.user.id;
        const {email, name} = req.body;
        if (!name || !email) {
            return res.status(401)
            .json({message: "All fields are required"});
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
            }, {
                new: true,
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(401)
            .json({message: "Some problem occured"});
        }

        res.status(200)
        .json({
            updatedUser,
            message: "User updated successfully",
        })
    } catch (error) {
        console.log(`Error in updateUser: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getAllUsers = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
             return res.status(401)
            .json({message: "Unauthorized"});
        }
        const allUsers = await User.find();
        res.status(200)
        .json({
            allUsers,
            message: "All users retrived",
        });
    } catch (error) {
        console.log(`Error in gettingAllUsers: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const getUserById = async(req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
             return res.status(401)
            .json({message: "Unauthorized"});
        }
        const requiredUser = await User.findById(id);
        if (!requiredUser) {
            return res.status(401)
            .json({message: "User not found"});
        }
        res.status(200)
        .json({
            requiredUser,
            message: "Retrived specific user"
        });
    } catch (error) {
        console.log(`Error in getUserById: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const updateRole = async(req, res) => {
    try {
        const {role} = req.body;
        const id = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
             return res.status(401)
            .json({message: "Unauthorized"});
        }
        const updatedRole = await User.findByIdAndUpdate(
            id,
            {
                role,
            }, {
                new: true,
            }
        ).select("-password");
        if (!updatedRole) {
            return res.status(401)
            .json({message: "Something went wrong"});
        }
        res.status(200)
        .json({
            updatedRole,
            message: "Role Updated Successfully"
        })
    } catch (error) {
        console.log(`Error in updateRole: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteUser = async(req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
             return res.status(401)
            .json({message: "Unauthorized"});
        }
        await User.findByIdAndDelete(id);
        res.status(200)
        .json({message: "User deleted successfully"});
    } catch (error) {
        console.log(`Error in deletingUser: ${error}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export {
    register,
    login,
    logout,
    profile,
    updateUser,
    getAllUsers,
    getUserById,
    updateRole,
    deleteUser,
}
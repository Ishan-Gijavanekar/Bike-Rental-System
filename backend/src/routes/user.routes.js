import express from 'express'
import { deleteUser, getAllUsers, getUserById, login, logout, profile, register, updateRole, updateUser } from '../controllers/user.controller.js';
import { securedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", securedRoute, profile)
router.put("/update-user", securedRoute, updateUser)
router.get("/get-all-users", securedRoute, getAllUsers)
router.get("/get-user-by-id/:id", securedRoute, getUserById)
router.put("/update-role/:id", securedRoute, updateRole)
router.delete("/delete-user/:id", securedRoute, deleteUser)

export default router;
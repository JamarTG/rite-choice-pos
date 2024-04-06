import express from "express";
import dotenv from "dotenv";
import UserController from "../controllers/User.js";

dotenv.config();

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify", UserController.verifyToken);


export default router;

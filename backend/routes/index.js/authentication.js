import express from "express";
import dotenv from "dotenv";
import User from "../../schemas/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    const existingEmailAddress = await User.findOne({ email });
    const existingName = await User.findOne({ name });

    if (existingName) {
      return res.status(400).json({ success: false, message: "Name already exists", field: "name" });
    }

    if (existingEmailAddress) {
      return res.status(400).json({ success: false, message: "Email already exists", field: "email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: `Internal server error ${error}` });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password", field: "email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid email or password", field: "password" });
    }

    const token = jwt.sign({ id: user.id }, "YOUR_SECRET_KEY", {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/verify", async (req, res) => {

  try {

    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    jwt.verify(token, "YOUR_SECRET_KEY", (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
      res.json({ success: true, message: "Valid token", decoded });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


export default router;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Store token in HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,  // Prevent JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === "production",  // Only send in HTTPS
      sameSite: "Strict",  // Prevent CSRF
      maxAge: 3600000,  // 1 hour expiry
    });

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};  


// 🚀 New Controller: Fetch All Users

export const getAllUsers = async (req, res) => {
  try {
    // Only authenticated users can access
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
export const logoutUser = (req, res) => {
  res.clearCookie("token");  // Remove the cookie
  res.status(200).json({ message: "Logged out successfully" });
};


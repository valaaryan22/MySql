import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import sendMail from "../utils/sendMail.js";
import * as Yup from "yup";  // Import Yup
import cron from "node-cron";

// Create Yup validation schema
const userValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must be at most 50 characters.")
    .matches(/^[a-zA-Z0-9 ]+$/, "Name must contain only letters, numbers, and spaces.")
    .required("Name is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password must be at most 20 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&).")
    .required("Password is required."),
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate User Input using Yup schema
    await userValidationSchema.validate(req.body, { abortEarly: false });

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User with current registration time
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      password_history: [],
      registration_time: new Date()
    });

    // Schedule sending welcome email 10 seconds after registration
    scheduleWelcomeEmail(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const scheduleWelcomeEmail = (user) => {
  const { name, email, registration_time } = user;
  const emailSendTime = new Date(registration_time);

  emailSendTime.setSeconds(emailSendTime.getSeconds() + 10);

  let minute = emailSendTime.getMinutes();
  let hour = emailSendTime.getHours();
  let day = emailSendTime.getDate();
  let month = emailSendTime.getMonth() + 1;
  let year = emailSendTime.getFullYear();
  let second = emailSendTime.getSeconds();

  const cronExpression = `${second} ${minute} ${hour} ${day} ${month} *`;

  cron.schedule(cronExpression, async () => {
    try {
      await sendMail(email, "Welcome!", `Hello ${name}, welcome to our platform!`);
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending welcome email to ${email}:`, error);
    }
  });
};


// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
// 🚀 Fetch All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
      // Get user ID from JWT token
      const token = req.cookies.token;
      if (!token) {
          return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      // Find user
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Return user data (excluding sensitive information)
      res.json({
          id: user.id,
          name: user.name,
          email: user.email
      });
  } catch (error) {
      console.error("Error getting current user:", error);
      res.status(500).json({ message: "Error getting user data" });
  }
};
// ✅ Logout User
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// ✅ Delete User by Email
export const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { email, name, newEmail } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update name and email if provided
    if (name) user.name = name;
    if (newEmail) user.email = newEmail;

    await user.save(); // Save updated data

    res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Error updating user details", error });
  }
};
const passwordChangeSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password must be at most 20 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&).")
    .required("Password is required."),
});

export const changeUserPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Password Change Input
    await passwordChangeSchema.validate(req.body, { abortEarly: false });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let passwordHistory = user.password_history || [];
    if (typeof passwordHistory === "string") {
      passwordHistory = JSON.parse(passwordHistory);
    }

    const isReuse = await Promise.all(
      passwordHistory.map(async (oldHash) => bcrypt.compare(password, oldHash))
    );

    if (isReuse.includes(true)) {
      return res.status(400).json({ message: "New password cannot be one of the last 3 used." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    passwordHistory = [hashedPassword, ...passwordHistory.slice(0, 2)];
    user.password_history = passwordHistory;
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password Update Error:", error);
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: "Error updating password", error });
  }
};


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import sendMail from "../utils/sendMail.js";
import cron from "node-cron";

// ✅ Validate User Input
const validateUser = (name, email, password) => {
  const errors = [];

  if (!name || name.length < 3 || name.length > 50 || !/^[a-zA-Z0-9 ]+$/.test(name)) {
    errors.push("Name must be 3-50 characters long and contain only letters, numbers, and spaces.");
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Invalid email format.");
  }

  if (!password || password.length < 8 || password.length > 20 ||
    !/[A-Z]/.test(password) || !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) || !/[@$!%*?&]/.test(password)) {
    errors.push("Password must be 8-20 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&).");
  }

  return errors;
};
// 🚀 Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate User Input
    const errors = validateUser(name, email, password);
    if (errors.length > 0) return res.status(400).json({ message: errors });

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
      registration_time: new Date() // Set the current date and time
    });

    // Ensure the user object has registration_time
    console.log("User created with registration_time:", user.registration_time);

    // Schedule sending welcome email 10 seconds after registration
    scheduleWelcomeEmail(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const scheduleWelcomeEmail = (user) => {
  const { name, email, registration_time } = user;

  // Ensure registration_time is a valid Date
  const emailSendTime = new Date(registration_time);
  if (isNaN(emailSendTime)) {
    console.error("Invalid registration_time:", registration_time);
    return; // Exit early if the date is invalid
  }

  // Calculate 10 seconds after registration time
  emailSendTime.setSeconds(emailSendTime.getSeconds() + 10); // Add 10 seconds to registration time

  // Extract time components (change const to let so we can reassign)
  let minute = emailSendTime.getMinutes();
  let hour = emailSendTime.getHours();
  let day = emailSendTime.getDate();
  let month = emailSendTime.getMonth() + 1; // Months are 0-indexed
  let year = emailSendTime.getFullYear();
  let second = emailSendTime.getSeconds(); // Get the seconds value as well

  // Debugging: log the values for time components
  console.log("Extracted Time - Hour:", hour, "Minute:", minute, "Second:", second, "Day:", day, "Month:", month);

  // Validate the extracted values, set fallback if any is invalid
  if (isNaN(hour) || hour < 0 || hour > 23) hour = 0;
  if (isNaN(minute) || minute < 0 || minute > 59) minute = 0;
  if (isNaN(second) || second < 0 || second > 59) second = 0;
  if (isNaN(day) || day < 1 || day > 31) day = 1;
  if (isNaN(month) || month < 1 || month > 12) month = 1;

  // We need to make sure the cron job runs on the specific date and time
  const cronExpression = `${second} ${minute} ${hour} ${day} ${month} *`;

  // Log the final cron expression for debugging
  console.log(`Scheduling cron job for: ${cronExpression} (Time: ${emailSendTime})`);

  // Schedule cron job
  cron.schedule(cronExpression, async () => {
    try {
      // Send Welcome Email
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
      secure: process.env.NODE_ENV === "production",
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
export const changeUserPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure password_history is always an array
    let passwordHistory = user.password_history || [];
    if (typeof passwordHistory === "string") {
      passwordHistory = JSON.parse(passwordHistory);
    }

    // Check if new password was used before
    const isReuse = await Promise.all(
      passwordHistory.map(async (oldHash) => bcrypt.compare(password, oldHash))
    );

    if (isReuse.includes(true)) {
      return res.status(400).json({ message: "New password cannot be one of the last 3 used." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and maintain last 3 passwords in history
    passwordHistory = [hashedPassword, ...passwordHistory.slice(0, 2)];
    user.password_history = passwordHistory;
    user.password = hashedPassword;

    await user.save(); // Save updated password

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password Update Error:", error);
    res.status(500).json({ message: "Error updating password", error });
  }
};

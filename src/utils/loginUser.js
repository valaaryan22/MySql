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
  
      // Send token in response header & body
      res.header("Authorization", `Bearer ${token}`).status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  };
  
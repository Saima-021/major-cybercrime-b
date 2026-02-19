const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone,dateOfBirth, password, state,city } = req.body;

    // 🔥 Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // 🔥 Check if phone already exists (optional but good)
    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already registered"
      });
    }

    // 🔥 Create new user
    const newUser = await User.create({
      fullName,
      email,
      phone,
      dateOfBirth,
      password,       // plain text (not secure for real apps)
      state,
      city
    });

    // 🔥 Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 Send response (hide password)
    res.status(201).json({
      success: true,
      message: "User registered successfully ✅",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        dateOfBirth: newUser.dateOfBirth,
        state: newUser.state,
        city: newUser.city
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 🔍 Compare password (plain text)
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 🔥 Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
         state: user.state,
          city: user.city,
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { registerUser, loginUser };


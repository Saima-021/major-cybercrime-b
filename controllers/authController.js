const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");

// Generate OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await Otp.deleteMany({ phone });

    await Otp.create({
      phone,
      otp: generatedOtp,
      expiresAt,
    });

    console.log("OTP:", generatedOtp); // For development only

    res.json({ message: "OTP generated successfully" });
  } catch (error) {
  console.log(error);   // 👈 ADD THIS
  res.status(500).json({ message: "Server error", error: error.message });
}

};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const phone = req.body && req.body.phone;
    const otp = req.body && req.body.otp;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP required" });
    }

    const record = await Otp.findOne({ phone, otp });

    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Delete OTP after success
    await Otp.deleteMany({ phone });

    // 🔐 Generate JWT Token
    const token = jwt.sign(
      { phone },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "OTP verified successfully",
      token
    });

  } catch (error) {
    console.log("ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

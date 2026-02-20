const express = require("express");
const router = express.Router();
const Report = require("../models/report.model");
const validateReport = require("../middleware/report.validation");
const upload = require("../middleware/upload"); // Import our new multer config

// Route: Add Report with Images
// Note: 'images' must match the 'name' attribute in your frontend input
router.post("/add", upload.array('images', 5), validateReport, async (req, res) => {
  try {
    // 1. Check Minimum 1 Image
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload at least 1 image as proof." });
    }

    // 2. Get the paths of the uploaded images
    const imageUrls = req.files.map(file => file.path);

    // 3. Create report and include the image paths
    const newReport = new Report({
      ...req.body,
      proof: imageUrls // Saving the array of file paths to the 'proof' field
    });

    await newReport.save();

    res.status(201).json({
      success: true,
      message: "Report submitted"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
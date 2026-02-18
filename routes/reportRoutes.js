const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const upload = require("../middleware/upload");

// Submit Report
router.post("/submit", upload.single("proofFile"), async (req, res) => {
  try {
    const report = new Report({
      ...req.body,
      proofFile: req.file ? req.file.filename : null,
    });

    await report.save();

    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

const Report = require("../models/Report");

exports.createReport = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const report = await Report.create({
      phone: req.user.phone,   // from JWT
      title,
      description,
      location,
    });

    res.status(201).json({
      message: "Report submitted successfully",
      report,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

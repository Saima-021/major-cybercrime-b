const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();   // ✅ CREATE APP FIRST

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);
app.use("/uploads", express.static("uploads"));
// Connect Database
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("CrimeHub Backend Running ✅");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

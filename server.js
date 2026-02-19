const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");  

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("CrimeHub Backend Running ✅");
});

/* ---------------- DATABASE ---------------- */
connectDB();

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

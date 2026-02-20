const express = require("express");
const { adminLogin } = require("../controllers/adminController");

const router = express.Router();

// Remove "admin" here
router.post("/login", adminLogin);

module.exports = router;

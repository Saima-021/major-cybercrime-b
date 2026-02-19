const express = require("express");
const { validate } = require("../middleware/validate.middleware");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../middleware/auth.validator");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  registerUser   // 👈 REPLACE test function with controller
);
router.post(
  "/login",
  loginValidator,
  validate,
  loginUser
);

module.exports = router;

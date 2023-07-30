const express = require("express");
const { authenticateToken } = require("../utils/authentication");
const { adminRolValidation } = require("../utils/services");
const { createUser, logIn } = require("../controllers/userController");
const {
  validateUserCreateInfo,
  validateUserLogInInfo,
} = require("../services/userServices");

const router = express.Router();

router.post(
  "/createUser",
  authenticateToken,
  adminRolValidation,
  validateUserCreateInfo,
  createUser
);
router.post("/login", validateUserLogInInfo, logIn);

module.exports = router;

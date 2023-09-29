const express = require("express");
const { authenticateToken } = require("../utils/authentication");
const { adminRolValidation } = require("../utils/services");
const {
  createUser,
  logIn,
  getUsers,
  getUserById,
  logOut,
} = require("../controllers/userController");
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

router.get("/createUser", authenticateToken, adminRolValidation, getUsers);

router.post("/createUser", authenticateToken, adminRolValidation, getUserById);

router.post("/logout", logOut);

module.exports = router;

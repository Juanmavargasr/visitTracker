const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { authenticateToken } = require("../utils/authentication");
const {
  createDepartment,
  getDepartment,
  getDeparmentById,
} = require("../controllers/departmentController");

const router = express.Router();

router.post("/", authenticateToken, adminRolValidation, createDepartment);
router.get("/", authenticateToken, adminRolValidation, getDepartment);
router.get("/:id", authenticateToken, adminRolValidation, getDeparmentById);

module.exports = router;

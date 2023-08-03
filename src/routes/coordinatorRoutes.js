const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { authenticateToken } = require("../utils/authentication");
const {
  createCoordinator,
  getCoordinator,
  getCoordinatorById,
} = require("../controllers/coordinatorController");

const router = express.Router();

router.post("/", authenticateToken, adminRolValidation, createCoordinator);
router.get("/", authenticateToken, adminRolValidation, getCoordinator);
router.get("/:id", authenticateToken, adminRolValidation, getCoordinatorById);

module.exports = router;

const express = require("express");
const { authenticateToken } = require("../utils/authentication");
const { adminRolValidation } = require("../utils/services");
const {
  createZone,
  getZone,
  getZoneById,
} = require("../controllers/zoneController");

const router = express.Router();

router.post("/", authenticateToken, adminRolValidation, createZone);
router.get("/", authenticateToken, adminRolValidation, getZone);
router.get("/:id", authenticateToken, adminRolValidation, getZoneById);

module.exports = router;

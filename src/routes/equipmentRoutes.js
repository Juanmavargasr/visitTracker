const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { authenticateToken } = require("../utils/authentication");
const {
  createEquipment,
  getEquipment,
  getEquipmentById,
} = require("../controllers/equipmentController");

const router = express.Router();

router.post("/", authenticateToken, adminRolValidation, createEquipment);
router.get("/", authenticateToken, adminRolValidation, getEquipment);
router.get("/:id", authenticateToken, adminRolValidation, getEquipmentById);

module.exports = router;

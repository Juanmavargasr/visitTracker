const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { createEquipment } = require("../controllers/equipmentController");

const router = express.Router();

router.post("/", adminRolValidation, createEquipment);

module.exports = router;

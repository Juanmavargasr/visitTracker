const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { createZone } = require("../controllers/zoneController");

const router = express.Router();

router.post("/", adminRolValidation, createZone);

module.exports = router;

const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { createCoordinator } = require("../controllers/coordinatorController");

const router = express.Router();

router.post("/", adminRolValidation, createCoordinator);

module.exports = router;

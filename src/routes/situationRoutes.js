const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { createSituation } = require("../controllers/situationController");

const router = express.Router();

router.post("/", adminRolValidation, createSituation);

module.exports = router;

const express = require("express");
const { authenticateToken } = require("../utils/authentication");
const { adminRolValidation } = require("../utils/services");
const {
  createSituation,
  getSituation,
  getSituationById,
} = require("../controllers/situationController");

const router = express.Router();

router.post("/", authenticateToken, adminRolValidation, createSituation);
router.get("/", authenticateToken, adminRolValidation, getSituation);
router.get("/:id", authenticateToken, adminRolValidation, getSituationById);

module.exports = router;

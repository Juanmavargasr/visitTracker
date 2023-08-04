const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { authenticateToken } = require("../utils/authentication");
const {
  createStore,
  getStore,
  getStoreById,
} = require("../controllers/storeController");

const router = express.Router();

router.post("/", authenticateToken, adminRolValidation, createStore);
router.get("/", authenticateToken, adminRolValidation, getStore);
router.get("/:id", authenticateToken, adminRolValidation, getStoreById);

module.exports = router;

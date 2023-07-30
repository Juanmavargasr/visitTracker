const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { createStore } = require("../controllers/storeController");

const router = express.Router();

router.post("/", adminRolValidation, createStore);

module.exports = router;

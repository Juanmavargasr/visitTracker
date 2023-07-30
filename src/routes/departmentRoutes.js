const express = require("express");
const { adminRolValidation } = require("../utils/services");
const { createDepartment } = require("../controllers/departmentController");

const router = express.Router();

router.post("/", adminRolValidation, createDepartment);

module.exports = router;

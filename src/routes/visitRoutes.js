const express = require("express");
const { validateTicket } = require("../services/visitService");
const { createVisit } = require("../controllers/visitController");

const router = express.Router();

router.post("/:id", validateTicket, createVisit);

module.exports = router;

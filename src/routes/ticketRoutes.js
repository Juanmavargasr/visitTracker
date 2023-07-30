const express = require("express");
const { authenticateToken } = require("../utils/authentication");
const { adminRolValidation } = require("../utils/services");
const { deparmetTicketValidation } = require("../services/ticketServices");
const {
  createTicket,
  getTicket,
  getTicketById,
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/", authenticateToken, adminRolValidation, createTicket);
router.get("/", authenticateToken, getTicket);
router.get("/:id", authenticateToken, deparmetTicketValidation, getTicketById);

module.exports = router;

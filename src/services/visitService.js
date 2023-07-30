const Visit = require("../models/visitModel");
const Ticket = require("../models/ticketModel");

require("dotenv").config();

const validateTicket = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(400).json({ error: "ticket is required" });
    }
    const ticket = await Ticket.findById({ _id: id });
    if (!ticket) {
      res.status(404).json({ error: "ticket Not found" });
    } else {
      req.ticket = ticket;
      next();
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "error" });
  }
};
module.exports = { validateTicket };

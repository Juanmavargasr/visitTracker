const Ticket = require("../models/ticketModel");
require("dotenv").config();

const deparmetTicketValidation = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  console.log(user);
  console.log(id);
  try {
    const foundTicket = await Ticket.findById({ _id: id });
    console.log(foundTicket);
    if (!foundTicket) {
      console.error("Ticket not found");
      res.status(404).json({
        error: "ticket not found",
      });
    } else if (user.department !== foundTicket.department) {
      console.error(
        error,
        "Unauthorized: ticket does not match with your deparment"
      );
      res.status(401).json({
        error: "Unauthorized: ticket does not match with your deparment",
      });
    } else if (user.department !== foundTicket.department) {
      next();
    } else {
      console.error(error, "ERROR IN TICKET SERVICES");
      res.status(400).json({ error: "error in ticket services" });
    }
  } catch (error) {
    console.error(error, "error validating ticket and user deparment");
    res
      .status(500)
      .json({ error: "error validating ticket and user deparment" });
  }
};

module.exports = { deparmetTicketValidation };

const Ticket = require("../models/ticketModel");

const createTicket = async (req, res) => {
  const {
    ticketNumber,
    reportedFrom,
    requester,
    coordinator,
    store,
    equipment,
    detail,
    priority,
    hopedDate,
    serviceKind,
    department,
    fulfilment,
    status,
  } = req.body;
  try {
    const newTicket = new Ticket({
      ticketNumber,
      reportedFrom,
      requester,
      coordinator,
      store,
      equipment,
      detail,
      priority,
      hopedDate,
      serviceKind,
      department,
      fulfilment,
      status,
    });

    const savedTicket = await newTicket.save();

    console.log("Creación de situación Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de situación Satisfactoria",
      usuario: newTicket,
    });
  } catch (error) {
    console.error("Error creating Ticket:", error);
    res.status(500).json({ error: "Error creating Ticket" });
  }
};

const getTicket = async (req, res) => {
  const user = req.user;
  const rol = user.rol;
  const department = user.department;

  try {
    if (rol === "admin") {
      const foundTickets = await Ticket.find({});
      res.status(200).json({
        message: "",
        foundTickets,
      });
    } else if (!department) {
      console.error("User does not have department");
      res.status(204).json({
        error: "User does not have deparment",
      });
    } else {
      console.log(user.department);
      const foundTickets = await Ticket.find({ department: department });
      console.log(foundTickets);
      res.status(200).json({
        message: "",
        foundTickets,
      });
    }
  } catch (error) {
    console.error(error, "error geting ticket list");
    res.status(500).json({
      error: "error geting ticket list",
    });
  }
};

const getTicketById = async (req, res) => {
  const id = rq.params.id;
  try {
    const foundTicket = await Ticket.findById({ _id: id });
    if (!foundTicket) {
      console.error(error, "Ticket not found");
      res.status(404).json({
        message: "ticket not found",
      });
    } else {
      res.status(200).json({
        message: `The ticket's ${foundTicket.ticketNumber} info is: `,
        ticket: foundTicket,
      });
    }
  } catch (error) {
    console.error(error, "error geting ticket");
    res.status(500).json({
      error: "error geting ticket",
    });
  }
};
module.exports = { createTicket, getTicket, getTicketById };

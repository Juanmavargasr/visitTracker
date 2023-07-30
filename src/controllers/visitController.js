const Visit = require("../models/visitModel");
const Ticket = require("../models/ticketModel");

const createVisit = async (req, res) => {
  const { startHour, finishHour, visitDate, repairman, detail, ott } = req.body;
  const ticket = req.ticket;
  try {
    const newVisit = new Visit({
      startHour,
      finishHour,
      visitDate,
      repairman,
      detail,
      ott,
    });

    const savedVisit = await newVisit.save();
    ticket.visit.push(newVisit);
    await ticket.save();

    console.log("Creación de visita Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de visita Satisfactoria",
      usuario: newVisit,
    });
  } catch (error) {
    console.error("Error creating Visit:", error);
    res.status(500).json({ error: "Error creating Visit" });
  }
};

module.exports = { createVisit };

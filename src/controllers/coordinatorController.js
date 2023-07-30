const Coordinator = require("../models/coordinatorModel");

const createCoordinator = async (req, res) => {
  const { name } = req.body;
  try {
    const newCoordinator = new Coordinator({
      name,
    });

    const savedCoordinator = await newCoordinator.save();

    console.log("Creación de Coordinator Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de Coordinator Satisfactoria",
      usuario: newCoordinator,
    });
  } catch (error) {
    console.error("Error creating coordinator:", error);
    res.status(500).json({ error: "Error creating coordinator" });
  }
};

module.exports = { createCoordinator };

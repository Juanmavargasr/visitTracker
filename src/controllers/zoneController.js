const Zone = require("../models/zoneModel");

const createZone = async (req, res) => {
  const { name } = req.body;
  try {
    const newZone = new Zone({
      name,
    });

    const savedZone = await newZone.save();

    console.log("Creación de zona Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de zona Satisfactoria",
      usuario: newZone,
    });
  } catch (error) {
    console.error("Error creating Zone:", error);
    res.status(500).json({ error: "Error creating Zone" });
  }
};

module.exports = { createZone };

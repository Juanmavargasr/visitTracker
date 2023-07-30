const Situation = require("../models/situationModel");

const createSituation = async (req, res) => {
  const { name } = req.body;
  try {
    const newSituation = new Situation({
      name,
    });

    const savedSituation = await newSituation.save();

    console.log("Creación de situación Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de situación Satisfactoria",
      usuario: newSituation,
    });
  } catch (error) {
    console.error("Error creating situation:", error);
    res.status(500).json({ error: "Error creating situation" });
  }
};

module.exports = { createSituation };

const Equipment = require("../models/equipmentModel");

const createEquipment = async (req, res) => {
  const { name } = req.body;
  try {
    const newEquipment = new Equipment({
      name,
    });

    const savedEquipment = await newEquipment.save();

    console.log("Creación de Equipment Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de Equipment Satisfactoria",
      usuario: newEquipment,
    });
  } catch (error) {
    console.error("Error creating Equipment:", error);
    res.status(500).json({ error: "Error creating Equipment" });
  }
};

module.exports = { createEquipment };

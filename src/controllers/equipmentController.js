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

const getEquipment = async (req, res) => {
  try {
    const foundEquipment = await Equipment.find({});
    if (!foundEquipment) {
      res.status(404).json({ message: "equipment not found" });
    } else {
      console.log("Succesfully equipment found");
      res.status(200).json({
        message: "succesfully equipment found",
        equipment: foundEquipment,
      });
    }
  } catch (error) {
    console.error(error, "error geting the equipment");
    res.status(500).json({
      error: "error getting the equipment",
    });
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const foundEquipment = await Equipment.findById({ _id: id });
    if (!foundEquipment) {
      res.status(404).json({ message: "equipment not found" });
    } else {
      console.log("Succesfully equipment found");
      res.status(200).json({
        message: "succesfully equipment found",
        equipment: foundEquipment,
      });
    }
  } catch (error) {
    console.error(error, "error geting the equipment");
    res.status(500).json({
      error: "error getting the equipment",
    });
  }
};

module.exports = { createEquipment, getEquipment, getEquipmentById };

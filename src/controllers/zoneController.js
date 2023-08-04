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

const getZone = async (req, res) => {
  try {
    const foundZone = await Zone.find({});
    if (!foundZone) {
      res.status(400).json({ message: "zone not found" });
    } else {
      res.status(200).json({
        message: "succesfully zone found",
        zone: foundZone,
      });
    }
  } catch (error) {
    console.error("error getting the zone", error);
    res.status(500).json({ message: "error geting the zones" });
  }
};

const getZoneById = async (req, res) => {
  const id = req.params.id;
  try {
    const foundZone = await Zone.findById({ _id: id });
    if (!foundZone) {
      res.status(400).json({ message: "zone not found" });
    } else {
      res.status(200).json({
        message: "succesfully zone found",
        zone: foundZone,
      });
    }
  } catch (error) {
    console.error("error getting the zone", error);
    res.status(500).json({ message: "error geting the zones" });
  }
};

module.exports = { createZone, getZone, getZoneById };

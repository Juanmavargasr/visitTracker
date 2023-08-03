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

const getCoordinator = async (req, res) => {
  try {
    const foundCoordinator = await Coordinator.find({});

    if (!foundCoordinator) {
      res.status(404).json({ message: "coordinators not found" });
    } else {
      res.status(200).json({
        message: "succesfully coordinators found",
        Coordinators: foundCoordinator,
      });
    }
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({ error: "error" });
  }
};

const getCoordinatorById = async (req, res) => {
  const id = req.params.id;
  try {
    const coordinatorFound = await Coordinator.findById({ _id: id });
    if (!coordinatorFound) {
      console.error(error, "coordinator not found");
      res.status(404).json({
        message: "Coordinaor not found",
      });
    } else {
      console.log("Coordinator succesfully found");
      res.status(200).json({
        message: "succesfully coordinator found",
        coordinator: coordinatorFound,
      });
    }
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({ error: "error" });
  }
};

module.exports = { createCoordinator, getCoordinator, getCoordinatorById };

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

const getSituation = async (req, res) => {
  try {
    const foundSituation = await Situation.find({});
    if (!foundSituation) {
      res.status(404).json({
        message: "Situation not found",
      });
    } else {
      console.log("Succesfully situation found");
      res.status(200).json({
        message: "succesfully situation found",
        situation: foundSituation,
      });
    }
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({
      message: "error getting the situation",
      error: error,
    });
  }
};

const getSituationById = async (req, res) => {
  const id = req.params.id;
  try {
    const foundSituation = await Situation.findById({ _id: id });
    if (!foundSituation) {
      res.status(404).json({ message: "Situation not found" });
    } else {
      console.log("succesfully found situation");
      res.status(200).json({
        message: "succesfully situation found",
        situation: foundSituation,
      });
    }
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({
      message: "error getting the situation",
      error: error,
    });
  }
};

module.exports = { createSituation, getSituation, getSituationById };

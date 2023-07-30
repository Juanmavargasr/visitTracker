const Store = require("../models/storeModel");

const createStore = async (req, res) => {
  const { name, zone } = req.body;
  try {
    const newStore = new Store({
      name,
      zone,
    });

    const savedStore = await newStore.save();

    console.log("Creación de situación Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de situación Satisfactoria",
      usuario: newStore,
    });
  } catch (error) {
    console.error("Error creating Store:", error);
    res.status(500).json({ error: "Error creating Store" });
  }
};

module.exports = { createStore };

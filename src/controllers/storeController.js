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

const getStore = async (req, res) => {
  try {
    const foundStore = await Store.find({});
    if (!foundStore) {
      res.status(404).json({ message: "Store not found" });
    } else {
      res.status(200).json({
        message: "Stores succesfully found",
        stores: foundStore,
      });
    }
  } catch (error) {
    console.error("error finding the stores", error);
    res.status(500).json({ error: "error finding the stores" });
  }
};

const getStoreById = async (req, res) => {
  const id = req.params.id;
  try {
    const foundStore = await Store.findById({ _id: id });
    if (!foundStore) {
      res.status(404).json({ message: "Store not found" });
    } else {
      res.status(200).json({
        message: "Stores succesfully found",
        stores: foundStore,
      });
    }
  } catch (error) {
    console.error("error finding the stores", error);
    res.status(500).json({ error: "error finding the stores" });
  }
};

module.exports = { createStore, getStore, getStoreById };

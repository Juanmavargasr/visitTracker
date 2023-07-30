const User = require("../models/userModel");
const db = require("../db");
require("dotenv").config();

const validateUserCreateInfo = async (req, res, next) => {
  const { id, name, password, rol, zone } = req.body;
  try {
    if (!id) {
      res.status(400).json({ error: "La cédula es requerida" });
    } else {
      const user = await User.findOne({ id });
      if (user) {
        res.status(400).json({ error: "Ya existe un User con esa cédula" });
      } else {
        if (!id || !name || !password || !rol || !zone) {
          res.status(400).json({ error: "todos los datos son necesarios" });
        } else {
          console.log("Validación de creación de User satisfactoria");
          next();
        }
      }
    }
  } catch (error) {
    console.error("Error validating create info:", error);
    res.status(500).json({ error: "error validating create info" });
  }
};

const validateUserLogInInfo = (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error validateing login info", error);
    res.status(500).json({ error: "error validating login info" });
  }
  next();
};

module.exports = { validateUserCreateInfo, validateUserLogInInfo };

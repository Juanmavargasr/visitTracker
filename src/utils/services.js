const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminRolValidation = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const payload = jwt.decode(token);

  if (payload.rol.toLowerCase() !== "admin") {
    res
      .status(400)
      .json({ error: "El usuario no tiene permisos para esta acción" });
  } else {
    next();
  }
};

module.exports = { adminRolValidation };

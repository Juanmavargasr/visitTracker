const Department = require("../models/departmentModel");

const createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const newDepartment = new Department({
      name,
    });

    const savedDepartment = await newDepartment.save();

    console.log("Creación de Department Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de Department Satisfactoria",
      usuario: newDepartment,
    });
  } catch (error) {
    console.error("Error creating deparment:", error);
    res.status(500).json({ error: "Error creating coordinator" });
  }
};

module.exports = { createDepartment };

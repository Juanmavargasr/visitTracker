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

const getDepartment = async (req, res) => {
  try {
    const deparmentFound = await Department.find({});
    if (!deparmentFound) {
      res.status(404).json({ message: "Department not found" });
    } else {
      console.log("Succesfully department found");
      res.status(200).json({
        message: "succesfully deparmtent found",
        department: deparmentFound,
      });
    }
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({ error: "error getting the deparments" });
  }
};

const getDeparmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const foundDepartment = await Department.findById({ _id: id });
    if (!foundDepartment) {
      res.status(404).json({
        message: "Department not found",
      });
    } else {
      console.log("succesfully department found");
      res.status(200).json({
        message: "succesfully department found",
        department: foundDepartment,
      });
    }
  } catch (error) {
    console.error(error, "error getting de department");
    res.status(500).json({
      message: "error getting de department",
    });
  }
};

module.exports = { createDepartment, getDepartment, getDeparmentById };

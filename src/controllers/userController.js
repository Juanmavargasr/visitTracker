const User = require("../models/userModel");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { id, name, password, rol, department, zone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id,
      name,
      password: hashedPassword,
      rol: rol.toLowerCase(),
      department,
      zone,
    });

    const savedUser = await newUser.save();

    console.log("Creación de User Satisfactoria");
    res.status(201).json({
      mensaje: " Creación de User Satisfactoria",
      User: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const logIn = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      _id: user._id,
      id: user.id,
      name: user.name, //ojo, creo que ese Name debe ser realmente un name
      rol: user.rol,
      department: user.department,
      zone: user.zone,
    };

    //Create a token
    const generateAccessToken = (payload) => {
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "60m" });
    };

    const accessToken = generateAccessToken(payload);

    //Response
    // res.header("authorization", accessToken).json({
    //   token: accessToken,
    // });

    console.log("Inicio de sesión satisfactorio");

    {
      res.cookie("token", accessToken, {});
      res.status(200).json({
        message: "Succesfully logIn",
        token: accessToken,
        user: payload,
      });
    }
  } catch (error) {
    console.error("Error login the user:", error);
    res.status(500).json({ error: "Error login the user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const foundUsers = await User.find({});
    if (!foundUser) {
      res.status(404).json({ message: "Users not found" });
    } else {
      res.status(200) -
        json({
          message: "Users succesfuly found",
          users: foundUsers,
        });
    }
  } catch (error) {
    console.error("Error finding the users", error);
    res.status(500).json({
      error: "Error finding the users",
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const foundUsers = await User.findById({ _id: id });
    if (!foundUser) {
      res.status(404).json({ message: "Users not found" });
    } else {
      res.status(200) -
        json({
          message: "Users succesfuly found",
          users: foundUsers,
        });
    }
  } catch (error) {
    console.error("Error finding the users", error);
    res.status(500).json({
      error: "Error finding the users",
    });
  }
};

const logOut = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "successfully logout" });
};

module.exports = { createUser, logIn, getUsers, getUserById, logOut };

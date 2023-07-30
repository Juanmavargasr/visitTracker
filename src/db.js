const mongoose = require("mongoose");
require("dotenv").config();

// URL de conexión a la base de datos MongoDB
const dbUrl = process.env.MONGO_URI;

// Opciones de configuración para la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "refri",
};

// Conectar a la base de datos
mongoose
  .connect(dbUrl, options)
  .then(() => {
    console.log("Succesfully databases conection");
  })
  .catch((error) => {
    console.error("Databases couldn't be connected", error);
  });

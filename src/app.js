const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.SECRET_PORT;
const cors = require("cors");

const { authenticateToken } = require("./utils/authentication");
const coordinatorRoutes = require("./routes/coordinatorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const equipRoutes = require("./routes/equipmentRoutes");
const situationRoutes = require("./routes/situationRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const visitRoutes = require("./routes/visitRoutes");
const zoneRoutes = require("./routes/zoneRoutes");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  try {
    const valideRequest = ["GET", "POST", "PUT", "DELETE"];
    const method = req.method.toUpperCase();
    if (!valideRequest.includes(method)) {
      return res.status(400).json({ error: "Not allowed method" });
    }
  } catch (error) {
    console.error("Error checking methods", error);
    res.status(500).json({ error: "Error checking methods" });
  }
  next();
});

app.use("/users", userRoutes);

app.use("/coordinators", authenticateToken, coordinatorRoutes);
app.use("/departments", authenticateToken, departmentRoutes);
app.use("/equipments", authenticateToken, equipRoutes);
app.use("/situations", authenticateToken, situationRoutes);
app.use("/stores", authenticateToken, storeRoutes);
app.use("/tickets", authenticateToken, ticketRoutes);
app.use("/visits", authenticateToken, visitRoutes);
app.use("/zones", authenticateToken, zoneRoutes);

app.listen(port, () => {
  console.log("Server running in port:", port);
});

require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");
require("./config/db");
const chartsRoutes = require("./routes/chartsRoutes");

const defectsRoutes = require("./routes/defectsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/defects", defectsRoutes);
app.use("/api/charts", chartsRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});

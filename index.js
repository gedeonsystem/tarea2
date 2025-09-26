const express = require("express");

/** Db */
const mongoose = require("./db");

/** Middlewares */
const performance = require("./middlewares/perfomance");

/** Controllers */
const eventosV1 = require("./controllers/v1/eventos");

//+++++++++++++++++++++++++++++++++++++++++++++//
const app = express();

app.use(express.json());

app.use(performance);

const PORT = 3001;
/** Controllers */
app.use("/api/v1/eventos", eventosV1);

app.get("/", (req, res) => {
  res.send("API de Eventos");
});

app.listen(PORT, () => {
  console.log(`El servidor esta Ejecutando ${PORT}`);
});

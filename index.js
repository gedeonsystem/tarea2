require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
/** Db */
const mongoose = require("./db");

/** Middlewares */
const performance = require("./middlewares/perfomance");

/** Controllers */
const eventosV1 = require("./controllers/v1/eventos");
const authsV1 = require("./controllers/v1/auths");
//+++++++++++++++++++++++++++++++++++++++++++++//
const app = express();

app.use(express.json());

app.use(performance);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: "ricardolaica2025",
    resave: false,
    saveUninitialized: false,
    cookie: {
      name: "sess:id",
      maxAge: 8 * 60 * 60 * 1000, // 8h
      secure: false,
    },
  })
);
const PORT = 3001;
/** Controllers */
app.use("/api/v1/eventos", eventosV1);
app.use("/api/v1/auths", authsV1);

app.get("/", (req, res) => {
  res.send("API de Eventos");
});

app.listen(PORT, () => {
  console.log(`El servidor esta Ejecutando ${PORT}`);
});

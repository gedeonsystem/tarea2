const mongoose = require("mongoose");

// Conexión a MongoDB local
mongoose
  .connect("mongodb://localhost:27017/tarea2")
  .then(() => console.log("✅ Conectado a MongoDB Local"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB Local:", err));

module.exports = mongoose;

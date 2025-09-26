const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  monto: {
    type: Number,
    required: true,
    trim: true,
  },
  fecha: {
    type: Date,
    required: true,
    trim: true,
  },
  tipo: {
    type: ["ingreso", "gasto"],
    required: true,
    trim: true,
  },
});

const Evento = mongoose.model("Evento", eventoSchema);

const saveEvento = (evento, callback) => {
  const { id, nombre, descripcion, monto, fecha, tipo } = evento;
  const newEvento = new Evento({ id, nombre, descripcion, monto, fecha, tipo });

  newEvento
    .save()
    .then(() => {
      console.log("✅ Nuevo Evento creado!");
      return callback(null, newEvento);
    })
    .catch((err) => {
      console.error(err);
      return callback(err);
    });
};

const findAllEventos = (callback) => {
  Evento.find()
    .then((results) => {
      console.log(" Todos los Eventos:", results);
      return callback(null, results);
    })
    .catch((err) => {
      console.error(err);
      return callback(err);
    });
};

const findEventosPaginados = (pagina, paso, callback) => {
  Evento.find()
    .then((results) => {
      console.log(" Todos los Eventos:", results);
      return callback(null, results.slice(pagina * paso, (pagina + 1) * paso));
    })
    .catch((err) => {
      console.error(err);
      return callback(err);
    });
};

const findEventoById = (id, callback) => {
  Evento.findOne({ id })
    .then((result) => {
      console.log(" Encontrado:", result);
      return callback(null, result);
    })
    .catch((err) => {
      console.error(err);
      console.log(" Error:", err);
      return callback(err);
    });
};

const updateEvento = (id, evento, callback) => {
  Evento.findOneAndUpdate({ id }, evento, { new: true })
    .then((result) => {
      console.log(" Actualizado:", result);
      return callback(null, result);
    })
    .catch((err) => {
      console.error(err);
      return callback(err);
    });
};

module.exports = {
  Evento,
  saveEvento,
  findAllEventos,
  findEventoById,
  updateEvento,
  findEventosPaginados,
};

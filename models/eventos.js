const Eventos = require("../schemas/eventos");

const getAllEventos = (callback) => {
  return Eventos.findAllEventos(callback);
};

const findEventosPaginados = (callback) => {
  return Eventos.findEventosPaginados(callback);
};

const getEventoById = (id, callback) => {
  return Eventos.findEventoById(id, callback);
};

const saveEvento = (evento, callback) => {
  return Eventos.saveEvento(evento, callback);
};

const updateEvento = (id, evento, callback) => {
  return Eventos.updateUser(id, evento, callback);
};

module.exports = {
  getAllEventos,
  getEventoById,
  saveEvento,
  updateEvento,
  findEventosPaginados,
};

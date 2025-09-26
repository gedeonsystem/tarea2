const User = require("../schemas/eventos");

const getAllEventos = (callback) => {
  return User.findAllEventos(callback);
};

const getEventoById = (id, callback) => {
  return User.findEventoById(id, callback);
};

const saveEvento = (evento, callback) => {
  return User.saveEvento(evento, callback);
};

const updateEvento = (id, evento, callback) => {
  return User.updateUser(id, evento, callback);
};

module.exports = {
  getAllEventos,
  getEventoById,
  saveEvento,
  updateEvento,
};

const router = require("express").Router();
const { query, validationResult } = require("express-validator");

const Eventos = require("../../models/eventos");

let eventos = [];

router.get("/", (req, res) => {
  return Eventos.getAllEventos((err, eventos) => {
    if (err) {
      return res
        .status(500)
        .json({ code: "ER", message: "Error al obtener eventos!" });
    }
    res.json({
      code: "OK",
      message: "Eventos Disponibles!",
      data: { eventos },
    });
  });
});

router.get(
  "/pag",
  query("pagina").notEmpty(),
  query("paso").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        code: "PF",
        message: "pagina y paso es requerido",
        errors: errors.array(),
      });
    }
    console.log(
      "Log: [Metodo: GET] , [url:/api/eventos/pag] hora",
      new Date().getHours(),
      "query:",
      req.query
    );

    const pagina = parseInt(req.query.pagina);
    const paso = parseInt(req.query.paso);

    return Eventos.findEventosPaginados(pagina, paso, (err, eventos) => {
      if (err) {
        return res
          .status(500)
          .json({ code: "ER", message: "Error al obtener los evento!" });
      }
      if (!evento) {
        return res
          .status(404)
          .json({ code: "NF", message: "Eventos no Encontrados" });
      }
      res.json({
        code: "OK",
        message: "Eventos Disponible!",
        data: { eventos },
      });
    });
  }
);

router.get("/query", query("id").notEmpty(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ code: "PF", message: "Evento ID es requerido!" });
  }

  const id = req.query.id;

  return Eventos.getEventoById(id, (err, evento) => {
    if (err) {
      return res
        .status(500)
        .json({ code: "ER", message: "Error al obtener evento!" });
    }
    if (!evento) {
      return res
        .status(404)
        .json({ code: "NF", message: "Evento no Encontrado" });
    }
    res.json({ code: "OK", message: "Evento Disponible!", data: { evento } });
  });
});

router.post("/", (req, res) => {
  console.log("POST /eventos:", req.body);
  const { nombre, descripcion, monto, fecha, tipo } = req.body;

  const newEvento = { id: 1001, nombre, descripcion, monto, fecha, tipo };

  return Eventos.saveEvento(newEvento, (err, evento) => {
    if (err) {
      return res
        .status(500)
        .json({ code: "ER", message: "Error al crear Evento!" });
    }
    res.json({
      code: "OK",
      message: "Evento Creado!",
      data: { evento },
    });
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const evento = eventos.find((evento) => evento.id == id);

  if (evento) {
    const { nombre, descripcion, monto, fecha, tipo } = req.body;
    evento.nombre = nombre;
    evento.descripcion = descripcion;
    evento.monto = monto;
    evento.fecha = fecha;
    evento.tipo = tipo;
    res.json({
      code: "OK",
      message: "Evento Actualizado!",
      data: { evento },
    });
    return;
  }

  res.status(404).json({ code: "NF", message: "Evento No Encontrado!" });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log("DELETE /eventos/:id:", id);
  const evento = eventos.find((evento) => evento.id == id);
  if (evento) {
    eventos = eventos.filter((evento) => evento.id != id);
    return res.json({
      code: "OK",
      message: "Evento Eliminado!",
      data: { evento },
    });
  }
  res.status(404).json({ code: "PF", message: "Evento no Econtrado!" });
});

module.exports = router;

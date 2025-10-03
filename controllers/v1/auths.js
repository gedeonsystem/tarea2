const router = require("express").Router();
const jwt = require("jsonwebtoken");
const basicAuthMiddleware = require("../../middlewares/basicAuth");
const Eventos = require("../../models/users");
const jwtSecret = "ricardolaica2025";

router.get("/token", basicAuthMiddleware, (req, res) => {
  jwt.sign({ user: req.user }, jwtSecret, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      return res
        .status(500)
        .json({ code: "ER", message: "Error al generar el token!" });
    }
    res.json({
      code: "OK",
      message: "Token generado Corectamente!",
      data: { token },
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ code: "UA", message: "Email y contraseña son obligatorios!" });
  }
  return Users.loginUser(email, password, (err, user) => {
    if (err) {
      return res.status(500).json({ code: "ER", message: "Error logging in!" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ code: "UA", message: "Email and password are invalid!" });
    }
    req.session.user = user;
    res.json({ code: "OK", message: "Login successfully!", data: { user } });
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ code: "OK", message: "Logout successfully!" });
});

module.exports = router;

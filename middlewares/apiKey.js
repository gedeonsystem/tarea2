const Users = require("../models/users");

return (module.exports = (req, res, next) => {
  const apiKey = req.query.apikey || req.headers["x-api-key"];
  if (!apiKey) {
    return res
      .status(401)
      .json({ code: "UA", message: "API key is requerido!" });
  }
  const user = Users.getUserByApiKey(apiKey, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({
          code: "ER",
          message: "Error al ontener el usuario by API key!",
        });
    }
    if (!user) {
      return res
        .status(401)
        .json({ code: "UA", message: "API key no es valido!" });
    }
    req.user = user;
    next();
  });
});

let message;

const error_handler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      message = err.errors.map((el) => el.message);
      res.status(400).json({ error: message });
      break;
    case "SequelizeUniqueConstraintError":
      message = err.errors.map((el) => el.message);
      res.status(400).json({ error: message });
      break;
    case "not found":
      res.status(404).json({ error: "Data not found" });
      break;
    case "invalid login":
      res.status(401).json({ error: "Wrong email/password" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ error: "Cannot Access" });
      break;
    case "no access":
      res.status(401).json({ error: "Cannot Access" });
      break;
    case "email required":
      res.status(400).json({ error: "email tidak boleh kosong" });
      break;
    case "token salah":
      res.status(400).json({ error: "token yang anda masukan salah" });
      break;
    case "password salah":
      res.status(400).json({ error: "password lama anda salah" });
      break;
    default:
      res.status(500).json({ error: "Server Error" });
      break;
  }
};

module.exports = error_handler;

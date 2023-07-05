const multer = require("multer");

const upload = multer({
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    console.log(fileSize);

    if (file) {
      if (
        (file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg") &&
        fileSize <= 250000
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb({ name: "failed upload" });
      }
    } else {
      cb(null, true);
    }
  },
});

module.exports = upload;

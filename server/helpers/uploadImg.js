const FormData = require("form-data");
const axios = require("axios");

const upload = async (file) => {
  try {
    const fileFoto = file.buffer.toString("base64");

    const form = new FormData();
    form.append("file", fileFoto);
    form.append("fileName", file.originalname);

    const response = await axios.post(
      "https://upload.imagekit.io/api/v1/files/upload",
      form,
      {
        headers: form.getHeaders(),
        auth: { username: process.env.imgKit_private_key },
      }
    );

    return response.data.url;
  } catch (err) {
    throw { name: "failed upload" };
  }
};

module.exports = upload;

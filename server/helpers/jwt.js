const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET_KEY;

const createToken = (payload) => jwt.sign(payload, key);

const verifyToken = (token) => jwt.verify(token, key);

module.exports = { createToken, verifyToken };

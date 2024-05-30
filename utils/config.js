const crypto = require("crypto");

const JWT_SECRET = crypto
  .randomBytes(16)
module.exports = { JWT_SECRET };
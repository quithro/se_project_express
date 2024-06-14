const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/unauthorized");


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Unauthorized"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
     process.env.NODE_ENV === "production" ? process.env.JWT_SECRET
     : "some-secret-key",
    );
  } catch (err) {
    next(new UnauthorizedError("Unauthorized"));
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
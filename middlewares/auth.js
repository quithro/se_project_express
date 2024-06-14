const jwt = require('jsonwebtoken');
const { NotAuthorized } = require('../errors/unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorized('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_SECRET
        : 'some-secret-key',
    );

  } catch (err) {
    next(new NotAuthorized('Authorization required'));
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
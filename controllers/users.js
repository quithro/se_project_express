const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const ConflictError = require("../errors/conflict");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const UnauthorizedError = require("../errors/unauthorized");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new ConflictError("Email already exists");
        return next(error);
      }

      return bcrypt.hash(password, 10).then((hash) => {
        User.create({ name, avatar, email, password: hash })
          .then((data) =>
            res.status(201).send({
              name: data.name,
              avatar: data.avatar,
              email: data.email,
            }),
          )
          .catch((err) => {
            console.error(err);
            if (err.name === "ValidationError") {
              next(new BadRequestError("Invalid Data"));
            } else {
              next(err);
            }
          });
      });
    })
      .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))
      .then((user) => {
        res.send({ data: user });
      })
      .catch((err) => {
        next(err)
      });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send({ user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Data"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === "production"
        ? process.env.JWT_SECRET
        : "dev-secret",
        {
          expiresIn: "7d",
        },
      );
      return res.status(200).send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};


module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUser,
};
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
        .status(BadRequestError)
        .send({ message: "Invalid data" });
      }
        return res
        .status(ServerError)
        .send({ message: "An error occured on the server." });
      });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(ServerError).send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
  .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NotFoundError)
          .send({ message: err.message });
      } if (err.name === "CastError") {
        return res
          .status(BadRequestError)
          .send({ message: "Invalid Data" });
      }
      return res
        .status(ServerError)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
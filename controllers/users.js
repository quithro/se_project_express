const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId);
  orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "getUser error in DocumentNotFoundError", err});
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "getUser error in CastError", err});
      }
      return res.status(500).send({ message: err.message});
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {

        res.status(500).send({ message: "An error occured on the server." });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser
};
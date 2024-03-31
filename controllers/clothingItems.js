const ClothingItem = require('../models/clothingItem');
const {
  BadRequestError,
  ServerError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

const createItem = (req, res) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem
    .create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      console.log(item);
      res.status(201).send({ data:item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
      return res.status(BadRequestError).send({ message: "Invalid Data" });
    }
    return res
      .status(ServerError)
      .send({ message: "An error has occurred on the server"});
  });
};

const getItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(200).send(items))
  .catch((err) => {
    console.log(err);
    res
    .status(ServerError)
    .send({ message: "An error has occurred on the server" });
  });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res.send(ForbiddenError, {
          message: "Item can't be deleted",
        });
      }
      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "Item deleted" }));
    })
      .catch((err) => {
        console.log(err);
        if (err.name === "DocumentNotFoundError") {
          return res
          .status(NotFoundError)
          .send({ message: err.message });
        }
        if (err.name === "CastError") {
          return res
          .status(BadRequestError)
          .send({ message: "Invalid data" });
        }
        return res
        .status(BadRequestError)
        .send({ message: "An error has occurred on the server" });
      });
    };

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .orFail()
  .then((item) => res.status(201).send({ data: item }))
  .catch((err) => {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res
      .status(NotFoundError)
      .send({ message: err.message });
    }

    if (err.name === "CastError") {
      return res
      .status(BadRequestError)
      .send({ message: "Invalid Data" });
    }

    return res
      .status(ServerError)
      .send({ message: "An error has occurred on the server" });
  });

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item}))
    .catch((err) => {
      console.error(err)
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NotFoundError)
          .send({ message: err.message });
      }

      if (err.name === "CastError") {
        return res
        .status(BadRequestError)
        .send({ message: "Invalid Data" });
      }
      return res
      .status(ServerError)
      .send({ message: "An error has occurred on the server." });
  });

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
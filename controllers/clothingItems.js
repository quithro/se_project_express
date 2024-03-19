const clothingItem = require('../models/clothingItem');

const createItem = (req, res) => {
  const { name, weatherType, imageUrl } = req.body;
  clothingItem
    .create({ name, weatherType, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error from createItem", err});
    });
};

const getItems = (res, req) => {
  User.find({})
  then((items) => res.status(200).send(items))
  .catch((err) => {
    console.error(err);
    res.status(500).send({ message: "Error from GetItems", err });
  });
};

/*const updateItem = (req, res) => {
  const {itemId} = req.param;
  const {imageURL} = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {$set: {imageURL}}).orFail().then((item) => res.status(200).send({data:item}))
  .catch((e) => {
    res.status(500).send({message: "Error from updateItem", e})
  })
} */

const deleteItem = (req, res) => {
  const{ itemId } = req.param;
  User.findById(itemId);
  orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err)
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: err.message })
      }
      res.status(500).send({ message: "Error from deleteItem", err })
  });
}

module.exports = {
  createItem,
  getItems,
  deleteItem
};
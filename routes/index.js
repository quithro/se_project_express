const router = require("express").Router();
const clothingItem = require("./clothingItems");
const users = require("./users");
const { NotFoundError } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", users);

router.use((req, res) => {
  res
  .status(NotFoundError)
  .send({ message: "Requested resource not found" });
});

module.exports = router;
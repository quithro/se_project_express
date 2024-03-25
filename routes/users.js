const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", auth, getUsers);
router.get("/:userId", auth, getUser);
router.post("/", auth, createUser);

module.exports = router;

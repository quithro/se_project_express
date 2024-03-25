const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");

const app = express();
//const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db', (r) => {
  //.then(() => {
    console.log("Connected to DB", r);
  /*})
    .catch(console.error);

  app.use(express.json());
  app.use((req, res, next) => {
    req.user = {
      _id: '5d8b8592978f8bd833ca8133'
    };
    next();
  });

  app.use("/", mainRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); */
});

app.use(cors());

const routes = require("./routes/index");

app.use(express.json());
app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes);

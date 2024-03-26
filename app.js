const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");

const routes = require("./routes/index");
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db', (r) => {
    console.log("Connected to DB", r);
});

app.use(cors());

app.use(express.json());
app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes);

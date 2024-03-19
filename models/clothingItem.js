const mongoose = require("mongoose");
const validator = require('validator');

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"]
  },
  ImageURL: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(v),
      message: 'Link is not Valid',
    },
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    Default: Date.now,
  },
});

module.exports = mongoose.model("clothingItems", clothingItemSchema);
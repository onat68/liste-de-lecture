const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  about: { type: String, required: false },
  author: { type: String, required: false },
  date: { type: String, required: true },
  externalId: { type: String, required: false },
  genre: {type: String, required: false},
  img: { type: String, required: false },
  releaseDate: { type: String, required: false },
  title: { type: String, required: true },
  type: { type: String, required: true }
});

const Film = mongoose.model("Film", filmSchema);

module.exports = Film

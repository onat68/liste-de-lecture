const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  directorName: { type: String, required: false },
  note: { type: String, required: false },
  img: { type: String, required: false },
  date: { type: String, required: false },
});

const Film = mongoose.model("Film", filmSchema);

module.exports = Film

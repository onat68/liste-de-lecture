const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
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

const Book = mongoose.model("Book", bookSchema);

module.exports = Book

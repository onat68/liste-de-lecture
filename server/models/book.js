const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  authorName: { type: String, required: false }, 
  note: { type: String, required: false },
  img: { type: String, required: false },
  date: { type: String, required: false },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book

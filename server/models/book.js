const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    note: { type: String, required: false },
    authors: { type: String, required: false },
    date: { type: String, required: false },
    externalId: { type: String, required: false },
    genre: { type: String, required: false },
    img: { type: String, required: false },
    releaseDate: { type: String, required: false },
    title: { type: String, required: true },
    type: { type: String, required: true },
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book

const Film = require("../models/film.js")
const Book = require("../models/book.js")
const Album = require("../models/album.js")

exports.createFilm = (req, res) => {
    delete req.body._id
    const film = new Film({
        ...req.body,
    })

    console.info(`Movie: ${film}`)


    film.save()
        .then(() => {
            res.status(201).json({ film })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.createBook = (req, res) => {
    delete req.body._id
    const book = new Book({
        ...req.body,
    })

    console.info(`Book: ${book}`)

    book.save()
        .then(() => {
            res.status(201).json({ book })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.createAlbum = (req, res) => {
    delete req.body._id

    const album = new Album({
        ...req.body,
    })

    console.info(`Album: ${album}`)

    album
        .save()
        .then(() => {
            res.status(201).json({ album })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteOneFilm = (req, res) => {
    Film.deleteOne({ _id: req.params.id })
        .then((film) => {
            console.log(req.params.id, " supprimé")
            res.status(200).json({ film, message: "Deleted" })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteOneAlbum = (req, res) => {
    Film.deleteOne({ _id: req.params.id })
        .then((album) => {
            console.log(req.params.id, " supprimé")
            res.status(200).json({ album, message: "Deleted" })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteOneBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
        .then((book) => {
            console.log(req.params.id, " supprimé")
            res.status(200).json({ book, message: "Deleted" })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.getAllThings = (req, res) => {
    const promises = []

    promises.push(Film.find())
    promises.push(Book.find())
    promises.push(Album.find())

    Promise.all(promises)
        .then((all) => {
            res.status(200).json({
                movies: all[0],
                books: all[1],
                albums: all[2],
            })
        })
        .catch((error) => res.status(400).json({ error }))
}

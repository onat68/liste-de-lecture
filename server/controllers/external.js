const dzr = require('../providers/dzr.js')
const gb = require('../providers/gb.js')
const tmdb = require('../providers/tmdb.js')

const fetch = require('node-fetch')

exports.findAlbum = async (req, res, next) => {
    const res1 = await fetch(dzr.albumUrl(req.params.query), dzr.options)
    const albums = await res1.json()
    const items = []
    for (const album of albums.data) {
        const res2 = await fetch(dzr.genreUrl(album.id), dzr.options)
        const genre = await res2.json()
        const item = await dzr.toObj(album, await genre)
        items.push(item)
    }
    res.status(200).send(JSON.stringify(items))
}

exports.findBook = async (req, res, next) => {
    const res1 = await fetch(gb.bookUrl(req.params.query), gb.options)
    const books = await res1.json()
    const items = []
    for (const book of books.items) {
        const item = await tmdb.toObj(book)
        items.push(item)
    }
    res.status(200).send(JSON.stringify(items))
}

exports.findMovie = async (req, res, next) => {
    const res1 = await fetch(tmdb.movieUrl(req.params.query), tmdb.options)
    const movies = await res1.json()
    const items = []
    for (const movie of movies.results) {
        const res2 = await fetch(tmdb.detailsUrl(movie.id), tmdb.options)
        const details = await res2.json()
        const item = await tmdb.toObj(movie, await details)
        items.push(item)
    }
    res.status(200).send(JSON.stringify(items))
}

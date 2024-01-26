const dzr = require("../clients/dzr.js")
const gb = require("../clients/gb.js")
const tmdb = require("../clients/tmdb.js")
const { JsonStreamStringify } = require("json-stream-stringify")

function matchProvider(type) {
    if (type == "Album") {
        return dzr
    } else if (type == "Book") {
        return gb
    } else if (type == "Movie") {
        return tmdb
    }
}

exports.find = async (req, res) => {
    if (req.params.type != "All") {
        const provider = matchProvider(req.params.type)
        const items = await provider?.find(req.params.query)
        const obj = {}

        obj[req.params.type.toLowerCase() + "s"] = await items

        res.status(200).send(JSON.stringify(await obj))
    } else {
        const albums = await dzr.find(req.params.query)
        const books = await gb.find(req.params.query)
        const movies = await tmdb.find(req.params.query)

        new JsonStreamStringify({ albums, books, movies }).pipe(res)
    }
}

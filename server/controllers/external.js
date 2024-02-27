const dzr = require("../clients/dzr.js")
const gb = require("../clients/gb.js")
const tmdb = require("../clients/tmdb.js")
const { JsonStreamStringify } = require("json-stream-stringify")

function matchProvider(type) {
    if (type === "Album") {
        return dzr
    } else if (type === "Book") {
        return gb
    } else if (type === "Movie") {
        return tmdb
    }
}

exports.find = async (req, res) => {
    const obj = { albums: [], books: [], movies: [] }
    if (req.params.type !== "All") {
        const provider = matchProvider(req.params.type)
        obj[req.params.type.toLowerCase() + "s"] = await provider.find(req.params.query)
    } else {
        obj.albums = await dzr.find(req.params.query)
        obj.books = await gb.find(req.params.query)
        obj.movies = await tmdb.find(req.params.query)
    }
    const readable = new JsonStreamStringify(await obj).pipe(res)
    readable.on("end", () => {
        res.end()
    })
}

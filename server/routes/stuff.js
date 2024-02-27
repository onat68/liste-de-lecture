const express = require("express")
const stuffRouter = express.Router()
const stuffCtrl = require("../controllers/stuff")

stuffRouter.post("/movies", stuffCtrl.createFilm)
stuffRouter.post("/albums", stuffCtrl.createAlbum)
stuffRouter.post("/books", stuffCtrl.createBook)
stuffRouter.delete("/movies/:id", stuffCtrl.deleteOneFilm)
stuffRouter.delete("/books/:id", stuffCtrl.deleteOneBook)
stuffRouter.delete("/albums/:id", stuffCtrl.deleteOneBook)
stuffRouter.get("/all", stuffCtrl.getAllThings)

module.exports = stuffRouter

const express = require("express")
// const { model } = require ('mongoose')
const stuffRouter = express.Router()
console.log(stuffRouter)
const stuffCtrl = require("../controllers/stuff")

stuffRouter.post("/films", stuffCtrl.createFilm)
stuffRouter.post("/albums", stuffCtrl.createAlbum)
stuffRouter.post("/books", stuffCtrl.createBook)
stuffRouter.delete("/films/:id", stuffCtrl.deleteOneFilm)
stuffRouter.delete("books/:id", stuffCtrl.deleteOneBook)
stuffRouter.delete("albums/:id", stuffCtrl.deleteOneBook)
stuffRouter.get("/all", stuffCtrl.getAllThings)

module.exports = stuffRouter

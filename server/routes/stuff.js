const express = require("express")
const stuffRouter = express.Router()
const stuffCtrl = require("../controllers/stuff")

require("dotenv").config()
const jwt = require("jsonwebtoken")

const secret = process.env.SECRET

stuffRouter.use(async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            if (token) {
                const payload = await jwt.verify(token, secret)
                if (payload) {
                    req.user = payload
                    next()
                } else {
                    throw new Error({ message: "Token verification failed." })
                }
            } else {
                throw new Error({ message: "Malformed auth header" })
            }
        } else {
            throw new Error({ message: "No authorization header" })
        }
    } catch (e) {
        res.status(400).json({ e })
    }
})
stuffRouter.post("/movies", stuffCtrl.createFilm)
stuffRouter.post("/albums", stuffCtrl.createAlbum)
stuffRouter.post("/books", stuffCtrl.createBook)
stuffRouter.delete("/movies/:id", stuffCtrl.deleteOneFilm)
stuffRouter.delete("/books/:id", stuffCtrl.deleteOneBook)
stuffRouter.delete("/albums/:id", stuffCtrl.deleteOneBook)
stuffRouter.get("/all", stuffCtrl.getAllThings)

module.exports = stuffRouter

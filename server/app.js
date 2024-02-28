require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const path = require("path")

const stuffRouter = require("./routes/stuff")
const userRouter = require("./routes/user")
const externalRouter = require("./routes/external")
const dirPath = path.join(__dirname + "/../VueList/dist")
const history = require("connect-history-api-fallback")

app.use(morgan("dev"))

mongoose
    .connect("mongodb+srv://onatrigault:lestat@clusterlater.ekjrhqs.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"))

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate", "Content-Type")
    next()
})

app.use("/api", stuffRouter)
app.use("/auth", userRouter)
app.use("/ext", externalRouter)

app.use(bodyParser.json())
app.use(express.static(dirPath))
app.use("/", history({ disableDotRule: true, verbose: true }))
app.use(express.static(dirPath))

module.exports = app

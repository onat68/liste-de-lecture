const express = require("express")
const authRouter = express.Router()
const userCtrl = require("../controllers/user")

authRouter.post("signup", userCtrl.signup)
authRouter.post("login", userCtrl.login)

module.exports = authRouter

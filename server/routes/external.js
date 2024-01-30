const express = require("express")
const extRouter = express.Router()
const externalCtrl = require("../controllers/external")

extRouter.get("/find/:type/:query", externalCtrl.find)
module.exports = extRouter

const express = require("express")
const { registUser } = require("../controllers/user-controller")
const route = express.Router()

route.post("/regist",registUser)

module.exports = route
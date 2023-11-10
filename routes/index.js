const express = require("express")
const tokenVerify = require("../middleware/auth")
const route = express.Router()
const userRoutes = require("./auth-routes")
const todoRoutes = require("./todo-routes")

route.get("/",(req,res)=>{
    res.json({
        message:"Selamat Datang di Express Server"
    })
})
route.use("/users",userRoutes)
route.use("/todos",tokenVerify,todoRoutes)
module.exports = route
const express = require("express")
const route = express.Router()
const userRoutes = require("./user-routes")

route.get("/",(req,res)=>{
    res.json({
        message:"Selamat Datang di Express Server"
    })
})
route.use("/users",userRoutes)
module.exports = route
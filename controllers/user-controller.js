const bcrypt = require("bcrypt")
const {User} = require("../models")

module.exports = {
    registUser : async(req,res)=>{
        try{
            const data = req.body
            const hashPassword = bcrypt.hashSync(data.password,10)
            data.password = hashPassword
            await User.create(data)
            res.status(201).json({
                message:"User Berhasil Dibuat"
            })
        }catch{
            res.json({
                message:"Gagal Melakukan Query"
            })
        }
    }
}
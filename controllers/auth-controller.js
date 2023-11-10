require("dotenv").config()
const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require('jsonwebtoken')

module.exports = {
    registUser: async (req, res) => {
        try {
            const data = req.body
            const dataUser = await User.findOne({ email: data.email })
            if (!dataUser) throw new Error("User sudah Terdaftar")
            const hashPassword = bcrypt.hashSync(data.password, 10)
            data.password = hashPassword
            await User.create(data)
            res.status(201).json({
                message: "User Berhasil Dibuat"
            })
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
    loginUser: async (req, res) => {
        try {
            const data = req.body
            const dataUser = await User.findOne({ email: data.email })
            if (!dataUser) throw new Error("User Blom Terdaftar")
            if (bcrypt.compareSync(data.password, dataUser.password)) {
                const token = jwt.sign({ id: dataUser.id, email: dataUser.email }, process.env.TOKEN_KEY)
                res.json({
                    message: "Berhasil Terlogin",
                    user: dataUser.id,
                    token: token
                })
                return
            }
            throw new Error("Password Salah")
        } catch (err) {
            res.status(400).json(err.message)
        }
    }
}
require("dotenv").config()
const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")

const secret_key = process.env.TOKEN_KEY

module.exports = {
    registUser: async (req, res) => {
        try {
            const data = req.body
            const dataUser = await User.findOne({
                where: {
                    email: {
                        [Op.eq]: data.email
                    }
                }
            })
            if (dataUser.length > 0) {
                res.json({
                    message: "User sudah terdaftar"
                })
                return
            }
            const hashPassword = bcrypt.hashSync(data.password, 10)
            data.password = hashPassword
            await User.create(data)
            res.status(201).json({
                message: "User Berhasil Dibuat"
            })
        } catch {
            res.json({
                message: "Gagal Melakukan Query"
            })
        }
    },
    loginUser: async (req, res) => {
        try {
            const data = req.body
            const dataUser = await User.findOne({
                where: {
                    email: {
                        [Op.eq]: data.email
                    }
                }
            })
            if (!dataUser) {
                res.json({
                    message: "User Belum Terdaftar"
                })
                return
            }
            if (bcrypt.compareSync(data.password, dataUser.password)) {
                const token = jwt.sign({ email: data.email },secret_key)
                res.json({
                    message: "Berhasil Terlogin",
                    token: token
                })
                return
            }
            res.json({
                message:"Passwordnya salah"
            })
        } catch{
            res.json({
                message: "Gagal Melakukan Querry"
            })
        }
    }
}
require("dotenv").config()
const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require('jsonwebtoken')

module.exports = {
    registUser: async (req, res) => {
        try {
            const data = req.body

            const dataUser = await User.findOne({ email: data.email })
            if (dataUser)
            return res.status(409).json({
                message:"Alamat Email Telah Terdaftar, Gunakan email lain"
            })

            const hashPassword = bcrypt.hashSync(data.password, 10)
            data.password = hashPassword
            await User.create(data)

            res.status(201).json({
                message: "Akun Berhasil Dibuat"
            })

        } catch (err) {
            console.error(err);
            res.status(500).json({message:"Terjadi Kesalahan Internal pada server"})
        }
    },
    loginUser: async (req, res) => {
        try {
            const data = req.body

            const dataUser = await User.findOne({ where:{email: data.email} })
            if (dataUser)
            return res.status(401).json({
                message:"Alamat Email belum terdaftar, Silahkan Lakukan Registrasi terlebih daulu"
            })

            if (bcrypt.compareSync(data.password, dataUser.password)) {
                const token = jwt.sign({ 
                    id: dataUser.id, email: dataUser.email 
                }, process.env.TOKEN_KEY)
                res.status(200).json({
                    message: "Berhasil Terlogin",
                    user: dataUser.id,
                    token: token
                })
                return
            }
            return res.status(401).json({
                message:"Password yang digunakan Salah"
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message:"Terjadi Kesalahan Internal pada server"
            })
        }
    }
}
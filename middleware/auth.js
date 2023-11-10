require("dotenv").config()
const jwt = require("jsonwebtoken")

const tokenVerify = (req, res, next) => {
    try {
        const header = req.headers.authorization
        if (!header) throw new Error("Invalid Header")

        const token = header.split(" ")[1]
        if (!token) throw new Error("token tidak ditemukan")

        const user = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = user

        next()
    } catch (err) {
        res.status(400).json(err.message)
    }
}

module.exports = tokenVerify
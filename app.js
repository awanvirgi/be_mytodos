const express = require("express")
const cors = require("cors")

const route = require("./routes")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(route)
app.use(cors())

app.listen(PORT, () => {
    console.log("Server Running On Port " + PORT)
})
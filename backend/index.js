const express = require("express")
const app = express()
const port = 3000
const connectDB = require("./config/db")
const dotenv = require("dotenv")
dotenv.config()


connectDB()


app.listen(3000, (req, res) => {
    console.log("Server is running on port " + port)
})
const express = require("express")
const mongoose = require("mongoose")
const chalk = require("chalk")
const { PORT, MONGOOSE_CONNECT } = require("./constants/server")
const server = express()

server.get("/products", (req, res) => {
   res.send({status: "ok"})
})



mongoose.connect(MONGOOSE_CONNECT).then(() => {
    console.log(chalk.bgBlue(" Mongoose connected... "))
    server.listen(PORT, () => {
        console.log(chalk.bgBlue(" Server started... "))
    })
})
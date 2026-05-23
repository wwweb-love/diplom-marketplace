const express = require("express")
const mongoose = require("mongoose")
const chalk = require("chalk")

const { PORT, MONGOOSE_CONNECT } = require("./constants/server")
const routes = require('./routes')

const server = express()
server.use(express.json())

server.use('/', routes)

mongoose.connect(MONGOOSE_CONNECT).then(() => {
    console.log(chalk.bgBlue(" Mongoose connected... "))
    server.listen(PORT, () => {
        console.log(chalk.bgBlue(" Server started... "))
    })
})
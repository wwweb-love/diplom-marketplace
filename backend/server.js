const express = require("express")
const mongoose = require("mongoose")
const chalk = require("chalk")
const cors = require('cors')
const cookieParser = require("cookie-parser")

const { PORT, MONGOOSE_CONNECT } = require("./constants/server")

const routes = require('./routes')

const server = express()

server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
server.use(express.json())
server.use(cookieParser())

server.use('/', routes)

mongoose.connect(MONGOOSE_CONNECT).then(() => {
    console.log(chalk.bgBlue(" Mongoose connected... "))
    server.listen(PORT, () => {
        console.log(chalk.bgBlue(" Server started... "))
    })
})
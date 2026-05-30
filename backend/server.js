require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const chalk = require("chalk")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const path = require("path")

const { PORT, MONGOOSE_CONNECT } = require("./constants/server")

const routes = require('./routes')

const server = express()
server.use(express.static("../frontend/dist"))
// server.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));
server.use(express.json())
server.use(cookieParser())

server.use('/', routes)

server.use((req, res) => {
    if (req.method === 'GET') {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
    } else {
        res.status(404).json({ error: "Not found", data: null });
    }
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log(chalk.bgBlue(" Mongoose connected... "))
    server.listen(PORT, () => {
        console.log(chalk.bgBlue(" Server started... "))
    })
})
const express = require('express')
const router = express.Router({ mergeParams: true })

// middlewares
const authenticated = require("../middlewares/authenticated")

// controllers
const { authorize, registration } = require("../controllers/User")

// sanitizers
const { sanitizerUser } = require("../sanitizers/all/auth/sanitizer-user")

// авторизация
router.get("/me", authenticated, async (req, res) => {
    try {
        const user = sanitizerUser(req.user)
        res.send({ error: null, data: user })
    } catch(error) {
        res.send({ error: error.message, data: null })
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const { login , password } = req.body
        const { token, user } = await authorize(login, password)

        res.cookie("token", token, { httpOnly: true })
        .send({error: null, data: sanitizerUser(user)})
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// register
router.post("/register", async (req, res) => {
    try {
        const { name, login , password } = req.body
        const { token, user } = await registration(name, login, password)

        res.cookie("token", token, { httpOnly: true })
        .send({error: null, data: sanitizerUser(user)})
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// logout
router.post("/logout", (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true })
        .send({error: null, data: null})
    } catch (error) {
        res.send({error: error.message, data: null})
    }
})

module.exports = router
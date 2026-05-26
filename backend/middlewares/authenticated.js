const { verify } = require("../helpers/token")
const UserModal = require("../models/User")

module.exports = async function(req, res, next) {
    if (!req.cookies.token) {
        res.send({error: "Пользователь не авторизован. Авторизуйтесь!"})
        return
    }

    const tokenData = verify(req.cookies.token)
    const user = await UserModal.findOne({ _id: tokenData.id })
    if (!user) {
        res.send({error: "Authenticated user not found"})
        return
    }

    req.user = user

    next()
}
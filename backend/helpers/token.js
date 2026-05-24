const jwt = require("jsonwebtoken")
const secret_key_sign = "test"

module.exports = {
    generate(data) {
        return jwt.sign(data, secret_key_sign, {expiresIn: '30d'})
    },
    verify(token) {
        return jwt.verify(token, secret_key_sign)
    }
}
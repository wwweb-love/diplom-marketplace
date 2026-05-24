const sanitizerUser = (user) => ({
    id: user._id,
    name: user.name,
    login: user.login,
    role: user.role
})

module.exports = { sanitizerUser }
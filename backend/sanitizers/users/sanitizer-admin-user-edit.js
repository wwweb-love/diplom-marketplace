const sanitizerAdminUserEdit = (user) => ({
    id: user._id,
    name: user.name,
    login: user.login, 
    password: user.password,
    role: user.role
})

module.exports = { sanitizerAdminUserEdit }
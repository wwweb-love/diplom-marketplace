const sanitizerAdminUsers = (users) => {
    return users.map(user => ({
        id: user._id,
        name: user.name,
        role: user.role.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }))
}

module.exports = { sanitizerAdminUsers }
const sanitizerAdminRoles = (roles) => {
    return roles.map(role => ({
        id: role._id,
        name: role.name,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt
    }))
}

module.exports = { sanitizerAdminRoles }
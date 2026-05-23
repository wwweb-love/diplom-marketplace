const sanitizerAdminRoleEdit = (role) => ({
    id: role._id,
    title: role.title,
    name: role.name
})

module.exports = { sanitizerAdminRoleEdit }
const RoleModel = require("../models/Role")

const getRoles = async () => {
    const roles = await RoleModel.find()
    return roles
}

const getRole = async (id) => {
    const role = await RoleModel.findOne({ _id: id })
    return role
}

const createRole = async (title, name) => {
    const role = await RoleModel.create({ title, name })
    const roles = await getRoles()
    return { role, roles }
}

const updateRole = async (id, title, name) => {
    const role = await RoleModel.findByIdAndUpdate({_id: id}, { title, name })
    const roles = await getRoles()
    return { role, roles }
}

const deleteRole = async (id) => {
    const role = await RoleModel.findByIdAndDelete({ _id: id })
    const roles = await getRoles()
    return { role, roles } 
}

module.exports = { getRoles, getRole, createRole, updateRole, deleteRole }
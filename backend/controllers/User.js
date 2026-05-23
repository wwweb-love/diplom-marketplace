const UserModel = require("../models/User")

const getUsers = async () => {
    const users = await UserModel.find()
    return users
}

const getUser = async (id) => {
    console.log(id)
    const user = await UserModel.findOne({ _id: id })
    return user
}

const createUser = async (name, login, password, role) => {
    const user = await UserModel.create({ name, login, password, role })
    const users = await getUsers()
    return { user, users }
}

const updateUser = async (id, name, login, password, role) => {
    const user = await UserModel.findByIdAndUpdate({_id: id}, { name, login, password, role })
    const users = await getUsers()
    return { user, users }
}

const deleteUser = async (id) => {
    const user = await UserModel.findByIdAndDelete({ _id: id })
    const users = await getUsers()
    return { user, users } 
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }
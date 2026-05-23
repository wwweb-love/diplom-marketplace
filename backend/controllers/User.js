const UserModel = require("../models/User")
const bcrypt = require("bcrypt")

const getUsers = async () => {
    const users = await UserModel.find().populate({ path: "role" })
    return users
}

const getUser = async (id) => {
    const user = await UserModel.findOne({ _id: id })
    return user
}

const createUser = async (name, login, password, role) => {
    const user = await UserModel.create({ name, login, password, role })
    const users = await getUsers()
    // const token = generate({ id: user.id })

    return { user, users }
}

const updateUser = async (id, name, login, password, role) => {
    if (password) {
        password = await bcrypt.hash(password, 10)
    }

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
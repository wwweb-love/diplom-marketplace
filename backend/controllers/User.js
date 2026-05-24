const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const { generate, verify } = require("../helpers/token")

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

const authorize = async (login, password) => {
    const user = await UserModel.findOne({ login })

    if (!user) throw new Error("User not defined")

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) throw new Error("Password invalid")

    const token = generate({ id: user._id })

    return { token, user }
}

const registration = async (name, login, password) => {

    if (!password) throw new Error("Password is empty")

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await UserModel.create({ name, login, password: passwordHash, role: "6a11e899e9e39217562455c9" })

    const token = generate({ id: user._id })

    return { user, token }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, authorize, registration }
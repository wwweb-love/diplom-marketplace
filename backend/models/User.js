const mongoose = require("mongoose")
const ROLES = require("../constants/roles")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)
module.exports = User
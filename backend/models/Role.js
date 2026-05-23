const mongoose = require("mongoose")

const RoleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    }
}, { timestamps: true })

const Role = mongoose.model("Role", RoleSchema)
module.exports = Role
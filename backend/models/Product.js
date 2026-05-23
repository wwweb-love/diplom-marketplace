const mongoose = require("mongoose")
const validator = require("validator")

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: "Image should be a valid url"
        }
    },
}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product
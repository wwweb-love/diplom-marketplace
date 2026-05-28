// package
import { useSelector } from "react-redux"
import * as yup from "yup"
// selectors
import { selectorAdminDataType } from "../selectors"
// constants
import { UserSchema, ProductSchema, CategorySchema } from "../constants"

export const getValidationSchema = () => {
    const adminDataType = useSelector(selectorAdminDataType)

    if (adminDataType === "users") return UserSchema
    if (adminDataType === "products") return ProductSchema
    if (adminDataType === "categories") return CategorySchema
    return yup.object().shape({}) // Схема по умолчанию
}
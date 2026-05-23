const express = require('express')
const router = express.Router({ mergeParams: true })

// controllers
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/User")
const { getRoles, getRole, createRole, updateRole, deleteRole } = require("../controllers/Role")
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/Product")
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/Category")

// sanitizers
const { sanitizerAdminUsers } = require("../sanitizers/admin/users/sanitizer-admin-users")
const { sanitizerAdminUserEdit } = require("../sanitizers/admin/users/sanitizer-admin-user-edit")
const { sanitizerAdminUserNotification } = require("../sanitizers/admin/users/sanitizer-admin-user-notification")

const { sanitizerAdminRoles } = require("../sanitizers/admin/roles/sanitizer-admin-roles")
const { sanitizerAdminRoleEdit } = require("../sanitizers/admin/roles/sanitizer-admin-role-edit")
const { sanitizerAdminRoleNotification } = require("../sanitizers/admin/roles/sanitizer-admin-role-notification")

const { sanitizerAdminProducts } = require("../sanitizers/admin/products/sanitizer-admin-products")
const { sanitizerAdminProductEdit } = require("../sanitizers/admin/products/sanitizer-admin-product-edit")
const { sanitizerAdminProductNotification } = require("../sanitizers/admin/products/sanitizer-admin-product-notification")

const { sanitizerAdminCategories } = require("../sanitizers/admin/category/sanitizer-admin-categories")
const { sanitizerAdminCategoryEdit } = require("../sanitizers/admin/category/sanitizer-admin-category-edit")
const { sanitizerAdminCategoryNotification } = require("../sanitizers/admin/category/sanitizer-admin-category-notification")


// ---------------------------------------------USERS---------------------------------------------
// Краткий список пользователей для показа
// Возвращает список пользователей для просмотра админ панели
router.get("/users", async (req, res) => {
    try {
        const usersController = await getUsers()
        const usersSanitizer = await sanitizerAdminUsers(usersController)
        res.send({error: null, data: usersSanitizer})
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полная информация о выбранном пользователе
// Возвращает информацию о пользователе для редактирования
router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const userController = await getUser(id)
        console.log(userController)
        const userSanitizer = await sanitizerAdminUserEdit(userController)
        res.send({ error: null, data: userSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Создание пользователя с данными
// Возвращает созданного пользователя и новый список пользователей
router.post("/user", async (req, res) => {
    try {
        const { name, login, password, role } = req.body
        const { user, users } = await createUser(name, login, password, role)
        const userSanitizer = sanitizerAdminUserNotification(user)
        const usersSanitizer = sanitizerAdminUsers(users)
        res.send({ error: null, data: { user: userSanitizer, users: usersSanitizer } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полное обновление пользоавтеля
// Возвращает обновленного пользоавтеля и новый список пользователей
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name, login, password, role } = req.body
        const { user, users } = await updateUser(id, name, login, password, role)
        const userSanitizer = sanitizerAdminUserNotification(user)
        const usersSanitizer = sanitizerAdminUsers(users)
        res.send({ error: null, data: { user: userSanitizer, users: usersSanitizer } })
    }
    catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Удаление пользователя
// Возвращает удаленного пользователя и новый список пользователей
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { user, users } = await deleteUser(id)
        const userSanitizer = sanitizerAdminUserNotification(user)
        console.log(userSanitizer)
        const usersSanitizer = sanitizerAdminUsers(users)
        res.send({ error: null, data: { user: userSanitizer, users: usersSanitizer } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// ---------------------------------------------ROLES---------------------------------------------

// Краткий список ролей для показа
// Возвращает список ролей для просмотра админ панели
router.get("/roles", async (req, res) => {
    try {
        const rolesController = await getRoles()
        const rolesSanitizer = await sanitizerAdminRoles(rolesController)
        res.send({ error: null, data: rolesSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полная информация о выбранной роли
// Возвращает информацию о роли для редактирования
router.get("/roles/:id", async (req, res) => {
    try {
        const { id } = req.params
        const roleController = await getRole(id)
        const roleSanitizer = await sanitizerAdminRoleEdit(roleController)
        res.send({ error: null, data: roleSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Создание роли с данными
// Возвращает созданную роль и новый список ролей
router.post("/role", async (req, res) => {
    try {
        const { title, name } = req.body
        const { role, roles } = await createRole(title, name)
        const roleSanitizer = sanitizerAdminRoleNotification(role)
        const rolesSanitizer = sanitizerAdminRoles(roles)
        res.send({ error: null, data: { role: roleSanitizer, roles: rolesSanitizer } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полное обновление роли
// Возвращает обновленную роль и новый список ролей
router.put("/roles/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title, name } = req.body
        const { role, roles } = await updateRole(id, title, name)
        const roleSanitizer = sanitizerAdminRoleNotification(role)
        const rolesSanitizer = sanitizerAdminRoles(roles)
        res.send({ error: null, data: { role: roleSanitizer, roles: rolesSanitizer } })
    }
    catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Удаление роли
// Возвращает удаленную роль и новый список ролей
router.delete("/roles/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { role, roles } = await deleteRole(id)
        const roleSanitizer = sanitizerAdminRoleNotification(role)
        const rolesSanitizer = sanitizerAdminRoles(roles)
        res.send({ error: null, data: { role: roleSanitizer, roles: rolesSanitizer } })

    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// ---------------------------------------------PRODUCTS---------------------------------------------

// Краткий список продуктов для показа
// Возвращает список продуктов для просмотра админ панели
router.get("/products", async (req, res) => {
    try {
        const productsController = await getProducts()
        const prodcuctsSanitizer = await sanitizerAdminProducts(productsController)
        res.send({ error: null, data: prodcuctsSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полная информация о выбранном продукте
// Возвращает информацию о продукте для редактирования
router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const productController = await getProduct(id)
        const productSanitizer = await sanitizerAdminProductEdit(productController)
        res.send({ error: null, data: productSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Создание продукта с данными
// Возвращает созданный продукт и новый список продуктов
router.post("/product", async (req, res) => {
    try {
        const { title, price, discount, image, count, category } = req.body
        const { product, products } = await createProduct(title, price, discount, image, count, category)
        console.log(product)
        console.log(products)
        const productSanitizer = sanitizerAdminProductNotification(product)
        const productsSanitizer = sanitizerAdminProducts(products)
        res.send({ error: null, data: { product: productSanitizer, products: productsSanitizer } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полное обновление продукта
// Возвращает обновленный продукт и новый список продуктов
router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title, price, discount, image, count, category } = req.body
        const { product, products } = await updateProduct(id, title, price, discount, image, count, category)
        const productSanitizer = sanitizerAdminProductNotification(product)
        const productsSanitizer = sanitizerAdminProducts(products)
        res.send({ error: null, data: { product: productSanitizer, products: productsSanitizer } })
    }
    catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Удаление продукта
// Возвращает удаленный продукт и новый список продуктов
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { product, products } = await deleteProduct(id)
        const productSanitizer = sanitizerAdminProductNotification(product)
        const productsSanitizer = sanitizerAdminProducts(products)
        res.send({ error: null, data: { product: productSanitizer, products: productsSanitizer } })

    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// ---------------------------------------------CATEGORIES---------------------------------------------

// Краткий список категорий для показа
// Возвращает список категорий для просмотра админ панели
router.get("/categories", async (req, res) => {
    try {
        const categoriesController = await getCategories()
        const categoriesSanitizer = await sanitizerAdminCategories(categoriesController)
        res.send({ error: null, data: categoriesSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полная информация о выбранной категории
// Возвращает информацию о категории для редактирования
router.get("/categories/:nameCategory", async (req, res) => {
    try {
        const { nameCategory } = req.params
        const id = CATEGORIES[nameCategory]
        const categoryController = await getCategory(id)
        const categorySanitizer = await sanitizerAdminCategoryEdit(categoryController)
        res.send({ error: null, data: categorySanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Создание категории с данными
// Возвращает созданную категорию и новый список продуктов
router.post("/category", async (req, res) => {
    try {
        const { title, name } = req.body
        const { category, categories } = await createCategory(title, name)
        const categorySanitizer = sanitizerAdminCategoryNotification(category)
        const categoriesSanitizer = sanitizerAdminCategories(categories)
        res.send({ error: null, data: { category: categorySanitizer, categories: categoriesSanitizer } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Полное обновление категории
// Возвращает обновленную категорию и новый список категорий
router.put("/categories/:nameCategory", async (req, res) => {
    try {
        const { nameCategory } = req.params
        const id = CATEGORIES[nameCategory]
        const { title, name } = req.body
        const { category, categories } = await updateCategory(id, title, name)
        const categorySanitizer = sanitizerAdminCategoryNotification(category)
        const categoriesSanitizer = sanitizerAdminCategories(categories)
        res.send({ error: null, data: { category: categorySanitizer, categories: categoriesSanitizer } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Удаление категории
// Возвращает удаленную категорию и новый список категорий
router.delete("/categories/:nameCategory", async (req, res) => {
    try {
        const { nameCategory } = req.params
        const id = CATEGORIES[nameCategory]
        const { category, categories } = await deleteCategory(id)
        const categorySanitizer = sanitizerAdminCategoryNotification(category)
        const categoriesSanitizer = sanitizerAdminCategories(categories)
        res.send({ error: null, data: { category: categorySanitizer, categories: categoriesSanitizer } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})


module.exports = router
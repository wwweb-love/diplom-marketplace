import { server } from "../constants"

export const getProducts = (textSearch, selectedCategory, selectedSort, page, pageLimit) => (
    fetch(`http://${server.ip}:${server.port}/products?textSearch=${textSearch}&category=${selectedCategory}&sort=${selectedSort}&page=${page}&pageLimit=${pageLimit}`, {credentials: 'include'}).then(loaded => loaded.json())
)

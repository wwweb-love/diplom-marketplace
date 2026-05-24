export const getProducts = (textSearch, selectedCategory, selectedSort, page, pageLimit) => (
    fetch(`http://localhost:3000/products?textSearch=${textSearch}&category=${selectedCategory}&sort=${selectedSort}&page=${page}&pageLimit=${pageLimit}`, {credentials: 'include'}).then(loaded => loaded.json())
)

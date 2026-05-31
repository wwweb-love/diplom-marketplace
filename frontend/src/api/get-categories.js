import server from "../constants"

export const getCategories = () => (
    fetch(`http://${server.ip}:${server.port}/categories`, {credentials: 'include'}).then(loaded => loaded.json())
)
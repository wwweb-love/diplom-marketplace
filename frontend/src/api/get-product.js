import {server} from "../constants"

export const getProduct = (id) => (
    fetch(`http://${server.ip}:${server.port}/product/${id}`, {credentials: 'include'}).then(loaded => loaded.json())
)
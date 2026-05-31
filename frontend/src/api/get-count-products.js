import {server} from "../constants"

export const getCountProducts = () => (
    fetch(`http://${server.ip}:${server.port}/count_products`, {credentials: 'include'}).then(loaded => loaded.json())
)